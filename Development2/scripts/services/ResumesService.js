/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').factory('ResumesService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {
    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    var serviceBase = RESOURCES.API_BASE_PATH;

    var resumesServiceFactory = {};

    var _searchResumes = function (text, skip, count) {
        params={};
        if (typeof text !== 'undefined')
        {
            params['text'] = text;
        }
        if (typeof skip !== 'undefined')
        {
            params['skip'] = 0;
        }
        if (typeof count !== 'undefined')
        {
            params['count'] = 10;
        }

        return $http.get(serviceBase + 'resumes/search',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            },
            params: params
        }).then(function (results) {
            return results;
        });
    };

    var _searchIntoResume = function(id, text){
        text = typeof text !== 'undefined' ? text : '';
        return $http.get(serviceBase + 'resumes/' + id + '/search',{
            params: {
                text: text
            }
        }).then(function (results) {
            return results;
        });
    };

    var _searchIntoPageResume = function(id, page, text){
        text = typeof text !== 'undefined' ? text : '';
        return $http.get(serviceBase + 'resumes/' + id + '/' + page + '/search',{
            params: {
                text: text
            }
        }).then(function (results) {
            return results;
        });
    };

    resumesServiceFactory.searchResumes = _searchResumes;
    resumesServiceFactory.searchIntoResume = _searchIntoResume;
    resumesServiceFactory.searchIntoPageResume = _searchIntoPageResume;

    return resumesServiceFactory;
}]);
