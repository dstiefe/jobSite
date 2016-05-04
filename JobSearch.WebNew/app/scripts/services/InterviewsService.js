/**
 * Created by Van on 17.01.2016.
 */
//Service for working with interviews
angular.module('Jobsite').factory('InterviewsService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {

    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));

    var serviceBase = RESOURCES.API_BASE_PATH;

    var interviewServiceFactory = {};

    var _getInterviews = function () {
        return $http.get(serviceBase + 'interviews/my',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _deleteInterview = function (id) {
        return $http.delete(serviceBase + 'interviews/'+id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getInterview = function (id) {
        return $http.get(serviceBase + 'interviews/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };
    var _postInterview = function (model) {
        return $http.post(serviceBase + 'interviews',
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
    var _putInterview = function (id, model) {
        return $http.put(serviceBase + 'interviews/'+id,
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
    var _postInterviewQuestion = function (id, model) {
        return $http.post(serviceBase + 'interviews/'+id+'/questions/',
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
    var _getInterviewQuestionsByInterviewId = function (referralId) {
        return $http.get(serviceBase + 'interviews/'+referralId+'/questions/',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getInterviewQuestionById = function (referralId, questionId) {
        return $http.get(serviceBase + 'interviews/'+referralId+'/questions/'+questionId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _putInterviewQuestion = function (referralId, questionId, model) {
        return $http.put(serviceBase + 'interviews/'+referralId+'/questions/'+questionId,
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
    var _deleteInterviewQuestion = function (referralId, questionId) {
        return $http.delete(serviceBase + 'interviews/'+referralId+'/questions/'+questionId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _sendInterviewRequestToResume = function (jobId, resumeId, model) {
        return $http.post(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/interviews/',
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
    var  _notifyInterviewCandidate= function (jobId, resumeId, model) {
        return $http.put(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/interviews/notify/',
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
    var _getInterviewByResumeId = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/interviews/'+referenceId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _getInterviewQuestions = function (jobId, resumeId, referenceId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/interviews/'+referenceId+'/questions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };
    var _setAnswersOnInterviewQuestions = function (jobId, resumeId, referenceId,model) {
        return $http.post(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/interviews/'+referenceId+'/questions/result',
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

    // Get interviews
    interviewServiceFactory.getInterviews = _getInterviews;
    // Delete interview
    interviewServiceFactory.deleteInterview = _deleteInterview;
    // Get interview
    interviewServiceFactory.getInterview = _getInterview;
    // Update interview
    interviewServiceFactory.putInterview = _putInterview;
    // Create interview
    interviewServiceFactory.postInterview = _postInterview;
    // Create interview question
    interviewServiceFactory.postInterviewQuestion = _postInterviewQuestion;
    // Get interview questions by interview ID
    interviewServiceFactory.getInterviewQuestionsByInterviewId  = _getInterviewQuestionsByInterviewId;
    // Get interview question by ID
    interviewServiceFactory.getInterviewQuestionById = _getInterviewQuestionById;
    // Update interview question
    interviewServiceFactory.putInterviewQuestion = _putInterviewQuestion;
    // Delete interview question
    interviewServiceFactory.deleteInterviewQuestion = _deleteInterviewQuestion;
    // Send interview to resume
    interviewServiceFactory.sendInterviewRequestToResume = _sendInterviewRequestToResume;
    // Notify interview candidate
    interviewServiceFactory.notifyInterviewCandidate = _notifyInterviewCandidate;
    // Get interviews by resume ID
    interviewServiceFactory.getInterviewByResumeId = _getInterviewByResumeId;
    // Get interview questions
    interviewServiceFactory.getInterviewQuestions = _getInterviewQuestions;
    // Set answer on interview question
    interviewServiceFactory.setAnswersOnInterviewQuestions = _setAnswersOnInterviewQuestions;

    return interviewServiceFactory;
}]);