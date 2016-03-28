/**
 * Created by Van on 04.03.2016.
 */
/**
 * Created by Van on 03.03.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("InterviewAssignController", function($scope,  $http, $timeout, $location,$filter, InterviewsService, JobsService, $state, $stateParams) {

    $scope.myInterviewId = $stateParams.id;
    $scope.selectedJobId = '';

    var _getInterviewById =function(interviewId) {
        return $filter('filter')($scope.interviews, {id:interviewId})[0];
    };

    var _getInterviewsByJobId = function() {
        var items = $filter('filter')($scope.interviews, $scope.jobExist);
        return $filter('orderBy')(items, 'sort');
    };


    //get my screenings
    InterviewsService.getInterviews().then(function (results) {
        $scope.interviews = results.data;
        $scope.myInterview = _getInterviewById($scope.myInterviewId);
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
        InterviewsService.putInterview($scope.myInterviewId, $scope.myInterview).then(function (results) {
            $state.go('editinterview', {'id': $scope.myInterviewId});
        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.jobAlreadyAssign = function(item) {
        if ($scope.myInterview.jobsIds.indexOf(item.id) != -1) {
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



    $scope.addMyInterview = function() {
        if ($scope.myInterview.jobsIds.indexOf($scope.selectedJobId) == -1) {
            var sort = $scope.myInterview.sort;

            var _screenings = _getInterviewsByJobId();

            if (_screenings !=null && _screenings.length > 0){
                sort = _screenings[_screenings.length-1].sort;
                sort++;
            }

            $scope.myInterview.sort = sort;
            $scope.myInterview.jobsIds.push($scope.selectedJobId);
        }
    };

});
