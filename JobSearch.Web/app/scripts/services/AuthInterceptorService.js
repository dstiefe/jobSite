/**
 * Created by Van on 11.05.2016.
 */

angular.module('Jobsite').factory("AuthInterceptorService", ['$q', '$injector', '$location','$cookies', function ($q, $injector, $location, $cookies) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};

            var data = $cookies.getObject("ValiDatedTokenObject");
            if (!data){
                var dataStr = sessionStorage.getItem("ValiDatedTokenObject");
                if (dataStr){
                    data = JSON.parse(dataStr);
                }
            }

            if (data && data.access_token) {
                config.headers.Authorization = 'Bearer ' + data.access_token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
                var authService = $injector.get('AuthService');
                authService.logOut();
                $location.path('/login').search('returnUrl', $location.path());
            }
            return $q.reject(response);
        }
    };
}]);
