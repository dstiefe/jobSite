/**
 * Created by Van on 10.04.2016.
 */
// Service for working with messages
angular.module('Jobsite').factory('MessagesService', ['$http', '$q', 'RESOURCES', function ($http, $q, RESOURCES) {

    var serviceBase = RESOURCES.API_BASE_PATH;

    var messagesServiceFactory = {};

    var _sendMessage = function (request) {
        return $http.post(serviceBase + 'messages', request).then(function (results) {
            return results;
        });
    };

    var _getMessages = function (jobId, resumeId) {
        return $http.get(serviceBase + 'jobs/' + jobId + '/resumes/' + resumeId + '/messages').then(function (results) {
            return results;
        });
    };

    var _sendBulkMessage = function (request) {
        return $http.post(serviceBase + 'messagesbulk', request).then(function (results) {
            return results;
        });
    };

    var _postMessageTemplate = function (request) {
        return $http.post(serviceBase + 'messagetemplates', request).then(function (results) {
            return results;
        });
    };

    var _getMessageTemplates = function () {
        return $http.get(serviceBase + 'messagetemplates').then(function (results) {
            return results;
        });
    };

    // Send message
    messagesServiceFactory.sendMessage = _sendMessage;
    // Get messages
    messagesServiceFactory.getMessages = _getMessages;
    // Send bulk-message
    messagesServiceFactory.sendBulkMessage = _sendBulkMessage;
    // Create message template
    messagesServiceFactory.postMessageTemplate = _postMessageTemplate;
    // Get message templates
    messagesServiceFactory.getMessageTemplates = _getMessageTemplates;

    return messagesServiceFactory;
}]);