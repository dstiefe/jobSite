/**
 * Created by Van on 17.01.2016.
 */
//Service for working with referrals
angular.module('Jobsite').factory('ReferralService', ['$http', '$q', 'RESOURCES', function ($http, $q, RESOURCES) {

    var serviceBase = RESOURCES.API_BASE_PATH;

    var referralServiceFactory = {};

    var _postReferral = function (model) {
        return $http.post(serviceBase + 'referrals', model).then(function (results) {
            return results;
        });
    };
    var _getReferrals = function () {
        return $http.get(serviceBase + 'referrals/my').then(function (results) {
            return results;
        });
    };
    var _getMyJobReferrals = function () {
        return $http.get(serviceBase + 'references/my').then(function (results) {
            return results;
        });
    };
    var _deleteJobReferral = function (id) {
        return $http.delete(serviceBase + 'references/' + id).then(function (results) {
            return results;
        });
    };
    var _getJobReferral = function (id) {
        return $http.get(serviceBase + 'references/' + id).then(function (results) {
            return results;
        });
    };
    var _postJobReferral = function (model) {
        return $http.post(serviceBase + 'references', model).then(function (results) {
            return results;
        });
    };
    var _putJobReferral = function (id, model) {
        return $http.put(serviceBase + 'references/' + id, model).then(function (results) {
            return results;
        });
    };
    var _postReferralQuestion = function (id, model) {
        return $http.post(serviceBase + 'references/' + id + '/questions/', model).then(function (results) {
            return results;
        });
    };
    var _getReferralQuestionsByJobReferralId = function (referralId) {
        return $http.get(serviceBase + 'references/' + referralId + '/questions/').then(function (results) {
            return results;
        });
    };
    var _getReferralQuestionById = function (referralId, questionId) {
        return $http.get(serviceBase + 'references/' + referralId + '/questions/' + questionId).then(function (results) {
            return results;
        });
    };
    var _putReferralQuestion = function (referralId, questionId, model) {
        return $http.put(serviceBase + 'references/' + referralId + '/questions/' + questionId, model).then(function (results) {
            return results;
        });
    };
    var _deleteReferralQuestion = function (referralId, questionId) {
        return $http.delete(serviceBase + 'references/' + referralId + '/questions/' + questionId).then(function (results) {
            return results;
        });
    };
    var _sendReferenceRequestToResume = function (jobId, resumeId, model) {
        return $http.post(serviceBase + 'jobs/' + jobId + '/resumes/' + resumeId + '/references/', model).then(function (results) {
            return results;
        });
    };
    var _sendReferenceToFriends = function (model) {
        return $http.post(serviceBase + 'references/friends', model).then(function (results) {
            return results;
        });
    };

    var _getReferenceCountToFriends = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/' + jobId + '/resumes/' + resumeId + '/references/' + referenceId + '/friends/count', {
            transformResponse: function (data, headersGetter, status) {
                //This was implemented since the REST service is returning a plain/text response
                //and angularJS $http module can't parse the response like that.
                return {content: data};
            }
        }).then(function (results) {
            return results;
        });
    };

    var _getReferences = function () {
        return $http.get(serviceBase + 'references/friends/my').then(function (results) {
            return results;
        });
    };

    var _getReferenceByResumeId = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/' + jobId + '/resumes/' + resumeId + '/references/' + referenceId).then(function (results) {
            return results;
        });
    };

    var _getReferenceQuestions = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/' + jobId + '/resumes/' + resumeId + '/references/' + referenceId + '/questions').then(function (results) {
            return results;
        });
    };

    var _setAnswersOnReferenceQuestions = function (jobId, resumeId, referenceId, model) {
        return $http.post(serviceBase + 'jobs/' + jobId + '/resumes/' + resumeId + '/references/' + referenceId + '/questions/result', model).then(function (results) {
            return results;
        });
    };

    // Create referral
    referralServiceFactory.postReferral = _postReferral;
    // Get referrals
    referralServiceFactory.getReferrals = _getReferrals;
    // Get my references
    referralServiceFactory.getMyJobReferrals = _getMyJobReferrals;
    // Delete reference
    referralServiceFactory.deleteJobReferral = _deleteJobReferral;
    // Get reference
    referralServiceFactory.getJobReferral = _getJobReferral;
    // Update reference
    referralServiceFactory.putJobReferral = _putJobReferral;
    // Create reference
    referralServiceFactory.postJobReferral = _postJobReferral;
    // Create reference question
    referralServiceFactory.postReferralQuestion = _postReferralQuestion;
    // Get reference questions by reference ID
    referralServiceFactory.getReferralQuestionsByJobReferralId = _getReferralQuestionsByJobReferralId;
    // Get reference question by ID
    referralServiceFactory.getReferralQuestionById = _getReferralQuestionById;
    // Update reference question
    referralServiceFactory.putReferralQuestion = _putReferralQuestion;
    // Delete reference question
    referralServiceFactory.deleteReferralQuestion = _deleteReferralQuestion;
    // Send reference request to resume
    referralServiceFactory.sendReferenceRequestToResume = _sendReferenceRequestToResume;
    // Send references to friends
    referralServiceFactory.sendReferenceToFriends = _sendReferenceToFriends;
    // Get references count
    referralServiceFactory.getReferenceCountToFriends = _getReferenceCountToFriends;
    // Get references
    referralServiceFactory.getReferences = _getReferences;
    // Get references by resume ID
    referralServiceFactory.getReferenceByResumeId = _getReferenceByResumeId;
    // Get reference questions
    referralServiceFactory.getReferenceQuestions = _getReferenceQuestions;
    // Set answer on reference question
    referralServiceFactory.setAnswersOnReferenceQuestions = _setAnswersOnReferenceQuestions;

    return referralServiceFactory;
}]);