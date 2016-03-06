/**
 * Created by Van on 03.03.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("ScreeningAssignController", function($scope, Login, $http, $timeout, $location,$filter, ScreeningsService, JobsService, $state, $stateParams) {

    $scope.myScreeningId = $stateParams.id;
    $scope.selectedJobId = '';


    var _getScreeningById =function(screeningId) {
        return $filter('filter')($scope.screenings, {id:screeningId})[0];
    };

    var _getScreeningsByJobId = function() {
        var items = $filter('filter')($scope.screenings, $scope.jobExist);
        return $filter('orderBy')(items, 'sort');
    };

    ////get screening
    //ScreeningsService.getScreening($scope.myScreeningId).then(function (results) {
    //    $scope.myScreening = results.data
    //}, function (error) {
    //    console.log(error.data.message);
    //});

    //get my screenings
    ScreeningsService.getMyScreenings().then(function (results) {
        $scope.screenings = results.data;
        $scope.myScreening = _getScreeningById($scope.myScreeningId);
        var jobsIds = $scope.myScreening.jobsIds;
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

    $scope.saveChanges = function() {
        ScreeningsService.putScreening($scope.myScreeningId, $scope.myScreening).then(function (results) {
            $state.go('editscreening', {'id': $scope.myScreeningId});
        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.jobAlreadyAssign = function(item) {
        if ($scope.myScreening.jobsIds.indexOf(item.id) != -1) {
            return false;
        } else {
            return true;
        }
    };

    $scope.jobExist = function(item) {
        if (item.jobsIds.indexOf($scope.selectedJobId) != -1) {
            return true;
        } else {
            return false;
        }
    };



    $scope.addMyScreening = function() {
        if ($scope.myScreening.jobsIds.indexOf($scope.selectedJobId) == -1) {
            var sort = $scope.myScreening.sort;

            var _screenings = _getScreeningsByJobId();

            if (_screenings !=null && _screenings.length > 0){
               sort = _screenings[_screenings.length-1].sort;
               sort++;
            }

            $scope.myScreening.sort = sort;
            $scope.myScreening.jobsIds.push($scope.selectedJobId);
        }
    };

});