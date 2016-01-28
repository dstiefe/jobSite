/**
 * Created by Van on 05.01.2016.
 */

angular.module('Jobsite').factory("AuthService", ['$http', '$q', 'ValiDatedTokenObject', 'RESOURCES', function ($http, $q, ValiDatedTokenObject, RESOURCES) {

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    var serviceBase = RESOURCES.API_BASE_PATH;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        isUser: false,
        isAdministrator:false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: "",
        email: "",
        firstName: "",
        lastName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            var isUser = response.roles == "User";
            var isAdministrator = response.roles == "Admin";

            response['isUser'] = isUser;
            response['isAdministrator'] = isAdministrator;
            ValiDatedTokenObject.setValiDatedTokenObject(response);
            sessionStorage.setItem("ValiDatedTokenObject", JSON.stringify(ValiDatedTokenObject.getValiDatedTokenObject()));

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.isUser = isUser;
            _authentication.isAdministrator = isAdministrator;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        sessionStorage.removeItem("ValiDatedTokenObject");

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.isUser = false;
        _authentication.isAdministrator = false;

    };

    var _fillAuthData = function () {
        var authData = sessionStorage.getItem("ValiDatedTokenObject")
        if (authData) {
            ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(authData));
            authData = ValiDatedTokenObject.getValiDatedTokenObject();

            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            if (!authData.isUser){
                _authentication.isUser = authData.roles == "User";
            }else{
                _authentication.isUser = authData.isUser;
            }

            if (!authData.isAdministrator){
                _authentication.isAdministrator = authData.roles == "Admin";
            }else{
                _authentication.isAdministrator = authData.isAdministrator;
            }
        }
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            var isUser = response.roles == "User";
            var isAdministrator = response.roles == "Admin";

            response['isUser'] = isUser;
            response['isAdministrator'] = isAdministrator;
            ValiDatedTokenObject.setValiDatedTokenObject(response);
            sessionStorage.setItem("ValiDatedTokenObject", JSON.stringify(ValiDatedTokenObject.getValiDatedTokenObject()));

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.isUser = isUser;
            _authentication.isAdministrator = isAdministrator;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'account/registerexternal', registerExternalData).success(function (response) {

            var isUser = response.roles == "User";
            var isAdministrator = response.roles == "Admin";

            response['isUser'] = isUser;
            response['isAdministrator'] = isAdministrator;
            ValiDatedTokenObject.setValiDatedTokenObject(response);
            sessionStorage.setItem("ValiDatedTokenObject", JSON.stringify(ValiDatedTokenObject.getValiDatedTokenObject()));

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.isUser = isUser;
            _authentication.isAdministrator = isAdministrator;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _resetPasswordToken = function (resetPasswordTokenData) {

        return   $http.post(serviceBase + 'account/resetpasswordtoken', resetPasswordTokenData).then(function (response) {
            return response;
        });
    };

    var _resetPassword = function (resetPasswordData) {
        return   $http.post(serviceBase + 'account/resetpassword', resetPasswordData).then(function (response) {
            return response;
        });
    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;
    authServiceFactory.resetPasswordToken = _resetPasswordToken;
    authServiceFactory.resetPassword = _resetPassword;

    return authServiceFactory;
}]);
