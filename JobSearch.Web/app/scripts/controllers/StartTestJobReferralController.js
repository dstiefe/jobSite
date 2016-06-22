/**
 * Created by Van on 07.03.2016.
 */
//Controller for starting test reference
angular.module('Jobsite').controller("StartTestJobReferralController", function ($scope, $http, $timeout, $location, AuthService, ReferralService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.jobId = $stateParams.jobId;
    $scope.resumeId = $stateParams.resumeId;
    $scope.jobReferralId = $stateParams.jobReferralId;
    var reference_friend_id = $stateParams.reference_friend_id;
    $scope.userName = $stateParams.userName;
    $scope.reference = {};

    $scope.isDisabledStart = false;
    $scope.error_message = '';

    if (AuthService.authentication.isAdministrator) {
        $location.path("/logout");
    }

    var _getReferences = function (){
        ReferralService.getReferenceByResumeId($scope.jobId, $scope.resumeId, $scope.jobReferralId).then(function (results) {
            $scope.reference = results.data;
            if ($scope.reference.questionsCount == 0) {
                $scope.error_message = 'Reference does not have any questions! Please try again later!';
                $scope.isDisabledStart = true;
            }
        }, function (error) {
            console.log(error.data);
            $scope.error_message = error.data;
            $scope.isDisabledStart = true;
        });
    };

    var referralObj = sessionStorage.getItem("reference_friend_ids");
    var referralsArr = [];
    if (referralObj != null) {
        referralsArr = JSON.parse(referralObj);
        if (referralsArr == null) {
            referralsArr = [];
        }
    }
    if (reference_friend_id != null && reference_friend_id != '' && referralsArr.indexOf(reference_friend_id) == -1) {
        referralsArr.push(reference_friend_id);
        sessionStorage.setItem("reference_friend_ids", JSON.stringify(referralsArr));

        if (!AuthService.authentication.isUser) {
            var path = $location.path();
            sessionStorage.setItem("return_url", path);
            $state.transitionTo('logout');
        }else{
            AuthService.trackReferences().then(function(response){
                _getReferences();
            }, function(error){
                console.log(error.data.message);
            });
        }
    }
    else {
        if (!AuthService.authentication.isUser) {
            $location.path("/logout");
        }else{
            _getReferences();
        }
    }

    $scope.start = function () {
        $scope.error_message = '';
        if ($scope.reference.questionsCount == 0) {
            $scope.error_message = 'Reference does not have any questions!';
            return;
        }
        if (!$scope.reference.isPassed) {
            $state.go('testsjobreferral', {
                'jobId': $scope.jobId,
                'resumeId': $scope.resumeId,
                'jobReferralId': $scope.jobReferralId
            });
        } else {
            $scope.error_message = 'You have already passed reference!';
        }
    }

});

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};
