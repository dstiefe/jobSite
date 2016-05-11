/**
 * Created by Van on 04.03.2016.
 */
//Controller for assingning referrals
angular.module('Jobsite').controller("ReferralAssignController", function ($scope, $http, $timeout, $location, $filter, ReferralService, JobsService, $state, $stateParams) {

    $scope.myReferralId = $stateParams.id;
    $scope.selectedJobId = '';

    var _getReferralById = function (referralId) {
        return $filter('filter')($scope.referrals, {id: referralId})[0];
    };

    var _getReferralsByJobId = function () {
        var items = $filter('filter')($scope.referrals, $scope.jobExist);
        return $filter('orderBy')(items, 'sort');
    };

    //get my screenings
    ReferralService.getMyJobReferrals().then(function (results) {
        $scope.referrals = results.data;
        $scope.myReferral = _getReferralById($scope.myReferralId);
        // get jobs
        JobsService.getMyJobs().then(function (results) {
            //$scope.jobs = results.data;
            $scope.jobs = $filter('filter')(results.data, $scope.jobAlreadyAssign);
        }, function (error) {
            console.log(error.data.message);
        });

    }, function (error) {
        console.log(error.data.message);
    });

    $scope.saveChanges = function () {
        ReferralService.putJobReferral($scope.myReferralId, $scope.myReferral).then(function (results) {
            $state.go('editreferral', {'id': $scope.myReferralId});
        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.jobAlreadyAssign = function (item) {
        if ($scope.myReferral.jobsIds.indexOf(item.id) != -1) {
            return false;
        } else {
            return true;
        }
    };

    $scope.jobExist = function (item) {
        if (item.jobsIds.indexOf($scope.selectedJobId) != -1) {
            return true;
        } else {
            return false;
        }
    };

    $scope.addMyReferral = function () {
        if ($scope.myReferral.jobsIds.indexOf($scope.selectedJobId) == -1) {
            var sort = $scope.myReferral.sort;

            var _screenings = _getReferralsByJobId();

            if (_screenings != null && _screenings.length > 0) {
                sort = _screenings[_screenings.length - 1].sort;
                sort++;
            }

            $scope.myReferral.sort = sort;
            $scope.myReferral.jobsIds.push($scope.selectedJobId);
        }
    };

});
