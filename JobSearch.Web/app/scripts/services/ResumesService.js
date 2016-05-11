/**
 * Created by Van on 17.01.2016.
 */
//Service for working with resumes
angular.module('Jobsite').factory('ResumesService', ['$http', '$q', 'RESOURCES', function ($http, $q, RESOURCES) {

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
            params: params
        }).then(function (results) {
            return results;
        });
    };

    var _getPageUrl = function(id, page){

        return $http.get(serviceBase + 'resumes/' + id + '/pdf/'+page+'/url',{
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
            params: params
        }).then(function (results) {
            return results;
        });
    };

    var _getNativeUrl = function(id){
        return $http.get(serviceBase + 'resumes/' + id + '/native/url',{
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
            transformResponse: function (data, headersGetter, status) {
                //This was implemented since the REST service is returning a plain/text response
                //and angularJS $http module can't parse the response like that.
                return {content: data};}
        }).then(function (results) {
            return results;
        });
    };

    var _getResume = function(id){
        return $http.get(serviceBase + 'resumes/'+id).then(function (results) {
            return results;
        });
    };

    var _getMyResumes = function(id){
        return $http.get(serviceBase + 'resumes/').then(function (results) {
            return results;
        });
    };

    var _deleteResume = function(id){
        return $http.delete(serviceBase + 'resumes/'+id).then(function (results) {
            return results;
        });
    };

    var _postResume = function(model){
        return $http.post(serviceBase + 'resumes', model).then(function (results) {
            return results;
        });
    };

    var _putResume = function(id, model){
        return $http.put(serviceBase + 'resumes/'+id, model).then(function (results) {
            return results;
        });
    };

    var _applyToJobByExistResume = function(jobId, model){
        return $http.post(serviceBase + 'jobs/'+jobId+'/applybyexistresume', model).then(function (results) {
            return results;
        });
    };

    var _applyToJob = function(jobId, model){
        return $http.post(serviceBase + 'jobs/'+jobId+'/apply', model).then(function (results) {
            return results;
        });
    };

    var _uploadResume = function(file){
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(serviceBase + 'resumes/upload', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (results) {
            return results;
        });
    };

    var _addAdminTags = function(resumeId, page, model){
        return $http.post(serviceBase + 'resumes/'+resumeId+'/pages/'+page+'/admintags',model).then(function (results) {
            return results;
        });
    };

    var _addAdminNotes = function(resumeId, page, model){
        return $http.post(serviceBase + 'resumes/'+resumeId+'/pages/'+page+'/adminnotes',model).then(function (results) {
            return results;
        });
    };

    var _getApplicant = function(jobId, resumeId){
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId).then(function (results) {
            return results;
        });
    };

    var _getApplicants = function(jobId){
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/').then(function (results) {
            return results;
        });
    };

    //search resumes
    resumesServiceFactory.searchResumes = _searchResumes;
    //search into resume
    resumesServiceFactory.searchIntoResume = _searchIntoResume;
    // search into page resume
    resumesServiceFactory.searchIntoPageResume = _searchIntoPageResume;
    // get page url
    resumesServiceFactory.getPageUrl = _getPageUrl;
    // count of searched resumes
    resumesServiceFactory.searchResumesCount = _searchResumesCount;
    // get native url
    resumesServiceFactory.getNativeUrl = _getNativeUrl;
    // get pdf url
    resumesServiceFactory.gePdfUrl = _getPdfUrl;
    // get resume
    resumesServiceFactory.getResume = _getResume;
    // get my resumes
    resumesServiceFactory.getMyResumes = _getMyResumes;
    // delete resume
    resumesServiceFactory.deleteResume = _deleteResume;
    // create resume
    resumesServiceFactory.postResume = _postResume;
    // update resume
    resumesServiceFactory.putResume = _putResume;
    // apply to job by existing resume
    resumesServiceFactory.applyToJobByExistResume = _applyToJobByExistResume;
    // apply to job
    resumesServiceFactory.applyToJob = _applyToJob;
    // upload resume
    resumesServiceFactory.uploadResume = _uploadResume;
    // get applicant
    resumesServiceFactory.getApplicant = _getApplicant;
    // add admin tags
    resumesServiceFactory.addAdminTags = _addAdminTags;
    // add admin notes
    resumesServiceFactory.addAdminNotes = _addAdminNotes;
    // add admin notes
    resumesServiceFactory.getApplicants = _getApplicants;

    return resumesServiceFactory;
}]);