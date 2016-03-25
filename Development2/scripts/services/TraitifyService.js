/**
 * Created by Van on 25.03.2016.
 */
angular.module('Jobsite').factory('TraitifyService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {

    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));

    var serviceBase = RESOURCES.API_BASE_PATH;

    var traitifyServiceFactory = {};

    var _getDecks = function () {
        return $http.get(serviceBase + 'traitify/decks/',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).then(function (results) {
            return results;
        });
    };

    var _sendTraitify = function (jobId, resumeId,  model) {
        return $http.post(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/traitifytest/',
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

    var _getTraitify = function (jobId, resumeId,  traitifyId) {
        return $http.get(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/traitifytest/'+traitifyId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    var _finishTraitify = function (jobId, resumeId,  traitifyId) {
        return $http.put(serviceBase + 'jobs/'+jobId+'/resumes/'+resumeId+'/traitifytest/'+traitifyId+'/finish',null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }).then(function (results) {
            return results;
        });
    };

    traitifyServiceFactory.getDecks = _getDecks;
    traitifyServiceFactory.sendTraitify = _sendTraitify;
    traitifyServiceFactory.getTraitify = _getTraitify;
    traitifyServiceFactory.finishTraitify = _finishTraitify;

    return traitifyServiceFactory;
}]);