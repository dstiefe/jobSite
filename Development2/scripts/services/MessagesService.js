/**
 * Created by Van on 10.04.2016.
 */
// Service for working with messages
angular.module('Jobsite').factory('MessagesService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {
    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    var serviceBase = RESOURCES.API_BASE_PATH;

    var messagesServiceFactory = {};

    var _sendMessage =  function (request) {
        return $http.post(serviceBase + 'messages',
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getMessages = function(jobId, resumeId){
        return $http.get(serviceBase + 'jobs/' + jobId + '/resumes/'+resumeId+'/messages',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _sendBulkMessage =  function (request) {
        return $http.post(serviceBase + 'messagesbulk',
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _postMessageTemplate =  function (request) {
        return $http.post(serviceBase + 'messagetemplates',
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _getMessageTemplates = function(){
        return $http.get(serviceBase + 'messagetemplates',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    messagesServiceFactory.sendMessage = _sendMessage;
    messagesServiceFactory.getMessages = _getMessages;
    messagesServiceFactory.sendBulkMessage = _sendBulkMessage;

    messagesServiceFactory.postMessageTemplate = _postMessageTemplate;
    messagesServiceFactory.getMessageTemplates = _getMessageTemplates;

    return messagesServiceFactory;
}]);