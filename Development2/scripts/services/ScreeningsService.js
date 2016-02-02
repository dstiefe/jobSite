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
        return $http.get(screenings + 'jobs/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _getMyScreenings = function () {
        return $http.get(screenings + 'screenings/my/',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _postScreeningQuestion = function (id, model) {
        return $http.post(screenings + 'screenings/'+id+'/questions/',
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
        return $http.get(screenings + 'resumes/'+resumeId+'/screenings/'+screeningId+'/questions/'+number,
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
        return $http.get(screenings + 'resumes/'+resumeId+'/screenings/'+screeningId,
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
        return $http.get(screenings + 'resumes/'+resumeId+'/screenings/'+screeningId+'/questions/'+questionId+'/result',
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

    screeningsServiceFactory.postScreening = _postScreening;
    screeningsServiceFactory.putScreening = _putScreening;
    screeningsServiceFactory.deleteScreening = _deleteScreening;
    screeningsServiceFactory.getScreening = _getScreening;
    screeningsServiceFactory.getMyScreenings = _getMyScreenings;
    screeningsServiceFactory.postScreeningQuestion = _postScreeningQuestion;
    screeningsServiceFactory.getScreeningQuestionByResumeId = _getScreeningQuestionByResumeId;
    screeningsServiceFactory.getScreeningByResumeId = _getScreeningByResumeId;
    screeningsServiceFactory.setResultOnScreeningQuestion = _setResultOnScreeningQuestion;

    return screeningsServiceFactory;
}]);