/**
 * Created by Van on 05.01.2016.
 */

//Authorization service
angular.module('Jobsite').factory("AuthService", ['$http', '$q', '$cookies', 'RESOURCES', function ($http, $q, $cookies, RESOURCES) {

    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }
    var serviceBase = RESOURCES.API_BASE_PATH;
    var authServiceFactory = {};
    var _authentication = {
        isAuth: false,
        userName: "",
        isUser: false,
        isAdministrator: false
    };
    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: "",
        email: "",
        firstName: "",
        lastName: ""
    };

    var _saveToken = function (data, rememberMe){
        rememberMe = typeof rememberMe !== 'undefined' ? rememberMe : true;
        if (rememberMe){
            var expireDate = new Date (new Date().getTime() + (1000 * data.expires_in));
            $cookies.putObject('ValiDatedTokenObject', data,{'expires': expireDate});
        }else{
            sessionStorage.setItem("ValiDatedTokenObject", JSON.stringify(data));
        }

    };

    var _getReferences = function(){
        var referralObj = sessionStorage.getItem("reference_friend_ids");
        var referralsArr =[];
        if (referralObj != null)
        {
            referralsArr = JSON.parse(referralObj);
            if (referralsArr == null){
                referralsArr =[];
            }
        }
        return referralsArr;
    };

    var _deleteReferences = function(){
        sessionStorage.removeItem("reference_friend_ids");
    };

    var _trackReferences = function(){

        var deferred = $q.defer();

        var model = {};

        model.referenceIds = _getReferences();
        if (_authentication.isUser && model.referenceIds.length > 0){
            $http.post(serviceBase + 'tracking/references', model).then(function (response) {
                _deleteReferences();
                deferred.resolve(response);
            }, function(err){
                deferred.reject(err);
            });
        }else{
            _deleteReferences();
            deferred.resolve(null);
        }

        //return the promise
        return deferred.promise;
    };

    var _getReferrals = function(){
        var referralObj = sessionStorage.getItem("referrals");
        var referralsArr =[];
        if (referralObj != null)
        {
            referralsArr = JSON.parse(referralObj);
            if (referralsArr == null){
                referralsArr =[];
            }
        }
        return referralsArr;
    };

    var _deleteReferrals = function(){
        sessionStorage.removeItem("referrals");
    };

    var _trackReferrals = function(){

        var model = {};

        model.referralIds = _getReferrals();

        if (_authentication.isUser && model.referralIds.length > 0){
            $http.post(serviceBase + 'tracking/referrals', model).then(function (response) {
                _deleteReferrals();
                return response;
            });
        }else{
            _deleteReferrals();
        }
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

            _saveToken(response, loginData.rememberMe);

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.isUser = isUser;
            _authentication.isAdministrator = isAdministrator;

            _trackReferrals();

            _trackReferences().then(function(resolve){
                deferred.resolve(response);
            }, function(err){
                deferred.reject(err);
            });

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {
        $cookies.remove("ValiDatedTokenObject");
        sessionStorage.removeItem("ValiDatedTokenObject");

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.isUser = false;
        _authentication.isAdministrator = false;

    };

    var _fillAuthData = function () {
        var authData = $cookies.getObject("ValiDatedTokenObject");

        if (!authData){
            var authDataObjStr = sessionStorage.getItem("ValiDatedTokenObject");
            if (authDataObjStr){
                authData = JSON.parse(authDataObjStr);
            }
        }

        if (authData) {
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
            _saveToken(response);
            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.isUser = isUser;
            _authentication.isAdministrator = isAdministrator;

            _trackReferrals();

            _trackReferences().then(function(resolve){
                deferred.resolve(response);
            }, function(err){
                deferred.reject(err);
            });


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
            _saveToken(response);
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

    // Registration method
    authServiceFactory.saveRegistration = _saveRegistration;

    // Authorization method
    authServiceFactory.login = _login;

    // Log out method
    authServiceFactory.logOut = _logOut;

    // Fill Authorization Data from storage
    authServiceFactory.fillAuthData = _fillAuthData;

    // Authorization Data
    authServiceFactory.authentication = _authentication;

    // Get Access Token
    authServiceFactory.obtainAccessToken = _obtainAccessToken;

    // External Authorization
    authServiceFactory.externalAuthData = _externalAuthData;

    // External Registration
    authServiceFactory.registerExternal = _registerExternal;

    // Reset password
    authServiceFactory.resetPasswordToken = _resetPasswordToken;

    // Reset password. Verify token
    authServiceFactory.resetPassword = _resetPassword;

    authServiceFactory.trackReferences =_trackReferences;

    return authServiceFactory;
}]);
