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
        return $http.get(serviceBase + 'jobreferrals/my',
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
        return $http.delete(serviceBase + 'jobreferrals/'+id,
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
        return $http.get(serviceBase + 'jobreferrals/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _postJobReferral = function (model) {
        return $http.post(serviceBase + 'jobreferrals',
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
        return $http.put(serviceBase + 'jobreferrals/'+id,
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
        return $http.post(serviceBase + 'jobreferrals/'+id+'/questions/',
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
        return $http.get(serviceBase + 'jobreferrals/'+referralId+'/questions/',
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
        return $http.get(serviceBase + 'jobreferrals/'+referralId+'/questions/'+questionId,
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
        return $http.put(serviceBase + 'jobreferrals/'+referralId+'/questions/'+questionId,
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
        return $http.delete(serviceBase + 'jobreferrals/'+referralId+'/questions/'+questionId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _sendReferenceRequestToResume = function (resumeId, model) {
        return $http.post(serviceBase + 'resumes/'+resumeId+'/jobreferral/',
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
        return $http.post(serviceBase + 'jobreferrals/friends',
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
    var _getReferences = function () {
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

    var _getReferenceByResumeId = function (resumeId, referenceId) {
        return $http.get(serviceBase + 'resumes/'+resumeId+'/jobreferrals/'+referenceId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getReferenceQuestions = function (resumeId, referenceId) {
        return $http.get(serviceBase + 'resumes/'+resumeId+'/jobreferrals/'+referenceId+'/questions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _setAnswersOnReferenceQuestions = function (resumeId, referenceId,model) {
        return $http.post(serviceBase + 'resumes/'+resumeId+'/jobreferrals/'+referenceId+'/questions/result',
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
    referralServiceFactory.getReferences = _getReferences;

    referralServiceFactory.getReferenceByResumeId = _getReferenceByResumeId;
    referralServiceFactory.getReferenceQuestions = _getReferenceQuestions;
    referralServiceFactory.setAnswersOnReferenceQuestions = _setAnswersOnReferenceQuestions;

    return referralServiceFactory;
}]);