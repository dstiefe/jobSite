/**
 * Created by Van on 26.02.2016.
 */
//Service for working with users
angular.module('Jobsite').factory('UsersService', ['$http', '$q', 'RESOURCES',function ($http, $q, RESOURCES) {

    var serviceBase = RESOURCES.API_BASE_PATH;

    var usersServiceFactory = {};

    var _getMyInfo = function(){
        return $http.get(serviceBase + 'users/me').then(function (results) {
            return results;
        });
    };

    usersServiceFactory.getMyInfo = _getMyInfo;

    return usersServiceFactory;
}]);
