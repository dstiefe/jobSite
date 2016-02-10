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


    referralServiceFactory.postReferral = _postReferral;
    referralServiceFactory.getReferrals = _getReferrals;

    return referralServiceFactory;
}]);