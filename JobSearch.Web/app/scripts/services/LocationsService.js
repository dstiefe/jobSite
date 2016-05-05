/**
 * Created by Van on 17.01.2016.
 */
//Service for working with locations
angular.module('Jobsite').factory('LocationsService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {

    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));

    var serviceBase = RESOURCES.API_BASE_PATH;

    var locationsServiceFactory = {};

    var _getLocations = function () {

        return $http.get(serviceBase + 'locations',{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (results) {
            return results;
        });
    };
    var _getLocation = function (id) {
        return $http.get(serviceBase + 'locations/'+id,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (results) {
            return results;
        });
    };
    var _suggestLocations = function (text, parentId, level, count) {
        params={};

        params['text'] = text;

        if (typeof parentId !== 'undefined')
        {
            params['parentId'] = parentId;
        }

        if (typeof level !== 'undefined')
        {
            params['level'] = level;
        }

        if (typeof count !== 'undefined')
        {
            params['count'] = count;
        }
        return $http.get(serviceBase + 'locations/suggest',{
            headers: {
                'Content-Type': 'application/json'
            },
            params: params
        }).then(function (results) {
            return results;
        });
    };

    // Get locations
    locationsServiceFactory.getLocations = _getLocations;
    // Get location
    locationsServiceFactory.getLocation = _getLocation;
    // Suggest locations
    locationsServiceFactory.suggestLocations = _suggestLocations;

    return locationsServiceFactory;
}]);