/**
 * Created by Van on 02.02.2016.
 */
angular.module('Jobsite').factory('ScreeningsService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {

    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));

    var serviceBase = RESOURCES.API_BASE_PATH;

    var screeningsServiceFactory = {};

    var _postScreening = function (model) {
        return $http.post(serviceBase + 'screenings',
            model,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _putScreening = function (id, model) {
        return $http.put(serviceBase + 'screenings/'+id,
            model,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _deleteScreening = function (id) {
        return $http.delete(serviceBase + 'screenings/'+id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getScreening = function (id) {
        return $http.get(serviceBase + 'screenings/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _getMyScreenings = function () {
        return $http.get(serviceBase + 'screenings/my/',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _postScreeningQuestion = function (id, model) {
        return $http.post(serviceBase + 'screenings/'+id+'/questions/',
            model,
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _getScreeningQuestionByResumeId = function (resumeId, screeningId, number) {
        return $http.get(serviceBase + 'resumes/'+resumeId+'/screenings/'+screeningId+'/questions/'+number,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getScreeningByResumeId = function (resumeId, screeningId) {
        return $http.get(serviceBase + 'resumes/'+resumeId+'/screenings/'+screeningId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _setResultOnScreeningQuestion = function (resumeId, screeningId, questionId, model) {
        return $http.post(serviceBase + 'resumes/'+resumeId+'/screenings/'+screeningId+'/questions/'+questionId+'/result',
            model,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getTestResultsByResumeId = function (resumeId) {
        return $http.get(serviceBase + 'resumes/'+resumeId+'/screenings/results',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getNewOrder = function (jobId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/screenings/order/new',
            {
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

    var _getScreeningsByJobId = function (jobId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/screenings',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _sendScreeningsToResume = function (resumeId, model) {
        return $http.post(serviceBase +  'resumes/'+resumeId+'/screenings',
            model,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getScreeningQuestionsByScreeningId = function (screeningId){
        return $http.get(serviceBase + 'screenings/'+screeningId+'/questions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    screeningsServiceFactory.postScreening = _postScreening;
    screeningsServiceFactory.putScreening = _putScreening;
    screeningsServiceFactory.deleteScreening = _deleteScreening;
    screeningsServiceFactory.getScreening = _getScreening;
    screeningsServiceFactory.getMyScreenings = _getMyScreenings;

    screeningsServiceFactory.postScreeningQuestion = _postScreeningQuestion;
    screeningsServiceFactory.getScreeningQuestionByResumeId = _getScreeningQuestionByResumeId;
    screeningsServiceFactory.getScreeningByResumeId = _getScreeningByResumeId;
    screeningsServiceFactory.setResultOnScreeningQuestion = _setResultOnScreeningQuestion;
    screeningsServiceFactory.getTestResultsByResumeId = _getTestResultsByResumeId;
    screeningsServiceFactory.getNewOrder = _getNewOrder;
    screeningsServiceFactory.getScreeningsByJobId = _getScreeningsByJobId;
    screeningsServiceFactory.sendScreeningsToResume = _sendScreeningsToResume;
    screeningsServiceFactory.getScreeningQuestionsByScreeningId  = _getScreeningQuestionsByScreeningId;

    return screeningsServiceFactory;
}]);