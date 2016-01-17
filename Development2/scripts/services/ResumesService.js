/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').factory('ResumesService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {
    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    var serviceBase = RESOURCES.API_BASE_PATH;

    var resumesServiceFactory = {};

    var _searchResumes = function (text, skip, count) {
        params={};
        if (typeof text !== 'undefined' && text !=='')
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

        params={};

        if (typeof text !== 'undefined' && text !=='')
        {
            params['text'] = text;
        }

        return $http.get(serviceBase + 'resumes/' + id + '/search',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            },
            params: params
        }).then(function (results) {
            return results;
        });
    };

    var _getPageUrl = function(id, page){
        debugger;
        return $http.get(serviceBase + 'resumes/' + id + '/pdf/'+page+'/url',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            },
            transformResponse: function (data, headersGetter, status) {
            //This was implemented since the REST service is returning a plain/text response
            //and angularJS $http module can't parse the response like that.
            return {content: data};}
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
    resumesServiceFactory.getPageUrl = _getPageUrl;

    return resumesServiceFactory;
}]);
