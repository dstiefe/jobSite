/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').factory('ReferralService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {
    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    var serviceBase = RESOURCES.API_BASE_PATH;

    var referralServiceFactory = {};

    var _postReferral = function (model) {
        return $http.post(serviceBase + 'referrals',
            model ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getReferrals = function () {
        return $http.get(serviceBase + 'referrals/my',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getMyJobReferrals = function () {
        return $http.get(serviceBase + 'references/my',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _deleteJobReferral = function (id) {
        return $http.delete(serviceBase + 'references/'+id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getJobReferral = function (id) {
        return $http.get(serviceBase + 'references/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _postJobReferral = function (model) {
        return $http.post(serviceBase + 'references',
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
    var _putJobReferral = function (id, model) {
        return $http.put(serviceBase + 'references/'+id,
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
    var _postReferralQuestion = function (id, model) {
        return $http.post(serviceBase + 'references/'+id+'/questions/',
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

    var _getReferralQuestionsByJobReferralId = function (referralId) {
        return $http.get(serviceBase + 'references/'+referralId+'/questions/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getReferralQuestionById = function (referralId, questionId) {
        return $http.get(serviceBase + 'references/'+referralId+'/questions/'+questionId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _putReferralQuestion = function (referralId, questionId, model) {
        return $http.put(serviceBase + 'references/'+referralId+'/questions/'+questionId,
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

    var _deleteReferralQuestion = function (referralId, questionId) {
        return $http.delete(serviceBase + 'references/'+referralId+'/questions/'+questionId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _sendReferenceRequestToResume = function (jobId, resumeId, model) {
        return $http.post(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/references/',
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

    var _sendReferenceToFriends = function (model) {
        return $http.post(serviceBase + 'references/friends',
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

    var _getReferenceCountToFriends  = function(jobId, resumeId, referenceId){
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/references/'+referenceId+'/friends/count',{
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
    var _getReferences = function () {
        return $http.get(serviceBase + 'references/friends/my',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getReferenceByResumeId = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/references/'+referenceId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getReferenceQuestions = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/references/'+referenceId+'/questions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _setAnswersOnReferenceQuestions = function (jobId, resumeId, referenceId,model) {
        return $http.post(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/references/'+referenceId+'/questions/result',
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

    referralServiceFactory.postReferral = _postReferral;
    referralServiceFactory.getReferrals = _getReferrals;

    referralServiceFactory.getMyJobReferrals = _getMyJobReferrals;
    referralServiceFactory.deleteJobReferral = _deleteJobReferral;
    referralServiceFactory.getJobReferral = _getJobReferral;
    referralServiceFactory.putJobReferral = _putJobReferral;
    referralServiceFactory.postJobReferral = _postJobReferral;
    referralServiceFactory.postReferralQuestion = _postReferralQuestion;

    referralServiceFactory.getReferralQuestionsByJobReferralId  = _getReferralQuestionsByJobReferralId;
    referralServiceFactory.getReferralQuestionById = _getReferralQuestionById;
    referralServiceFactory.putReferralQuestion = _putReferralQuestion;
    referralServiceFactory.deleteReferralQuestion = _deleteReferralQuestion;
    referralServiceFactory.sendReferenceRequestToResume = _sendReferenceRequestToResume;
    referralServiceFactory.sendReferenceToFriends = _sendReferenceToFriends;
    referralServiceFactory.getReferenceCountToFriends = _getReferenceCountToFriends;
    referralServiceFactory.getReferences = _getReferences;

    referralServiceFactory.getReferenceByResumeId = _getReferenceByResumeId;
    referralServiceFactory.getReferenceQuestions = _getReferenceQuestions;
    referralServiceFactory.setAnswersOnReferenceQuestions = _setAnswersOnReferenceQuestions;

    return referralServiceFactory;
}]);