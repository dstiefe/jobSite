/**
 * Created by Van on 04.03.2016.
 */
/**
 * Created by Van on 03.03.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("ReferralAssignController", function($scope, Login, $http, $timeout, $location,$filter, ReferralService, JobsService, $state, $stateParams) {

    $scope.myReferralId = $stateParams.id;
    $scope.selectedJobId = '';
    // get jobs
    JobsService.getMyJobs().then(function (results) {
        $scope.jobs = results.data
    }, function (error) {
        console.log(error.data.message);
    });

    var _getReferralById =function(referralId) {
        return $filter('filter')($scope.referrals, {id:referralId})[0];
    };

    var _getReferralsByJobId = function() {
        var items = $filter('filter')($scope.referrals, $scope.jobExist);
        return $filter('orderBy')(items, 'sort');
    };


    //get my screenings
    ReferralService.getMyJobReferrals().then(function (results) {
        $scope.referrals = results.data;
        $scope.myReferral = _getReferralById($scope.myReferralId);
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.saveChanges = function() {
        $scope.putJobReferral($scope.myReferralId, $scope.myReferral).then(function (results) {
            $state.go('editreferral', {'id': $scope.myReferralId});
        }, function (error) {
            console.log(error.data.message);
        });
    };


    $scope.jobExist = function(item) {
        if (item.jobsIds.indexOf($scope.selectedJobId) != -1) {
            return true;
        } else {
            return false;
        }
    };



    $scope.addMyReferral = function() {
        if ($scope.myReferral.jobsIds.indexOf($scope.selectedJobId) == -1) {
            var sort = $scope.myReferral.sort;

            var _screenings = _getReferralsByJobId();

            if (_screenings !=null && _screenings.length > 0){
                sort = _screenings[_screenings.length-1].sort;
                sort++;
            }

            $scope.myReferral.sort = sort;
            $scope.myReferral.jobsIds.push($scope.selectedJobId);
        }
    };

});
