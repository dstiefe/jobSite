/**
 * Created by Van on 17.01.2016.
 */
// Service for working with clients
angular.module('Jobsite').factory('ClientsService', ['$http', '$q', 'RESOURCES', function ($http, $q, RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;

    var clientServiceFactory = {};

    var _getClients = function () {
        return $http.get(serviceBase + 'clients').then(function (results) {
            return results;
        });
    };
    var _deleteClient = function (id) {
        return $http.delete(serviceBase + 'clients/'+id).then(function (results) {
            return results;
        });
    };
    var _getClient = function (id) {
        return $http.get(serviceBase + 'clients/'+id).then(function (results) {
            return results;
        });
    };
    var _postClient = function (model) {
        return $http.post(serviceBase + 'clients', model).then(function (results) {
            return results;
        });
    };
    var _putClient = function (id, model) {
        return $http.put(serviceBase + 'clients/'+id,model).then(function (results) {
            return results;
        });
    };

    // Get clients
    clientServiceFactory.getClients = _getClients;
    // Delete client
    clientServiceFactory.deleteClient = _deleteClient;
    // Get client
    clientServiceFactory.getClient = _getClient;
    // Update Client
    clientServiceFactory.putClient = _putClient;
    //Create Client
    clientServiceFactory.postClient = _postClient;

    return clientServiceFactory;
}]);