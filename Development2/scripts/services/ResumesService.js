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
            params['skip'] = skip;
        }
        if (typeof count !== 'undefined')
        {
            params['count'] = count;
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

    var _searchResumesCount = function (text) {
        params={};
        if (typeof text !== 'undefined' && text !=='')
        {
            params['text'] = text;
        }

        return $http.get(serviceBase + 'resumes/search/count',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            },
            transformResponse: function (data, headersGetter, status) {
                //This was implemented since the REST service is returning a plain/text response
                //and angularJS $http module can't parse the response like that.
                return {content: data};},
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
        params={};

        if (typeof text !== 'undefined' && text !=='')
        {
            params['text'] = text;
        }
        return $http.get(serviceBase + 'resumes/' + id + '/' + page + '/search',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            },
            params: params
        }).then(function (results) {
            return results;
        });
    };

    var _getNativeUrl = function(id){
        return $http.get(serviceBase + 'resumes/' + id + '/native/url',{
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

    var _getPdfUrl = function(id){
        return $http.get(serviceBase + 'resumes/' + id + '/pdf/url',{
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

    var _getResume = function(id){
        return $http.get(serviceBase + 'resumes/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _getMyResumes = function(id){
        return $http.get(serviceBase + 'resumes/',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _deleteResume = function(id){
        return $http.delete(serviceBase + 'resumes/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _postResume = function(model){
        return $http.post(serviceBase + 'resumes', model,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _putResume = function(id, model){
        return $http.put(serviceBase + 'resumes/'+id, model,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _applyToJobByExistResume = function(jobId, model){
        return $http.post(serviceBase + 'jobs/'+jobId+'/applybyexistresume', model,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _applyToJob = function(jobId, model){
        return $http.post(serviceBase + 'jobs/'+jobId+'/apply', model,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

        var _uploadResume = function(file){
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(serviceBase + 'resumes/upload', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                    }
                }).then(function (results) {
                return results;
            });
        };

    var _addAdminTags = function(resumeId, page, model){
        return $http.post(serviceBase + 'resumes/'+resumeId+'/pages/'+page+'/admintags',model,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _addAdminNotes = function(resumeId, page, model){
        return $http.post(serviceBase + 'resumes/'+resumeId+'/pages/'+page+'/adminnotes',model,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _getApplicant = function(jobId, resumeId){
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    resumesServiceFactory.searchResumes = _searchResumes;
    resumesServiceFactory.searchIntoResume = _searchIntoResume;
    resumesServiceFactory.searchIntoPageResume = _searchIntoPageResume;
    resumesServiceFactory.getPageUrl = _getPageUrl;
    resumesServiceFactory.searchResumesCount = _searchResumesCount;
    resumesServiceFactory.getNativeUrl = _getNativeUrl;
    resumesServiceFactory.gePdfUrl = _getPdfUrl;
    resumesServiceFactory.getResume = _getResume;
    resumesServiceFactory.getMyResumes = _getMyResumes;
    resumesServiceFactory.deleteResume = _deleteResume;
    resumesServiceFactory.postResume = _postResume;
    resumesServiceFactory.putResume = _putResume;
    resumesServiceFactory.applyToJobByExistResume = _applyToJobByExistResume;
    resumesServiceFactory.applyToJob = _applyToJob;
    resumesServiceFactory.uploadResume = _uploadResume;
    resumesServiceFactory.getApplicant = _getApplicant;

    resumesServiceFactory.addAdminTags = _addAdminTags;
    resumesServiceFactory.addAdminNotes = _addAdminNotes;


    return resumesServiceFactory;
}]);