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

    referralServiceFactory.postReferral = _postReferral;
    referralServiceFactory.getReferrals = _getReferrals;

    referralServiceFactory.getMyJobReferrals = _getMyJobReferrals;
    referralServiceFactory.deleteJobReferral = _deleteJobReferral;
    referralServiceFactory.getJobReferral = _getJobReferral;
    referralServiceFactory.putJobReferral = _putJobReferral;
    referralServiceFactory.postJobReferral = _postJobReferral;
    referralServiceFactory.postReferralQuestion = _postReferralQuestion;

    return referralServiceFactory;
}]);