/**
 * Created by Van on 03.02.2016.
 */
//Controller for editing interview
angular.module('Jobsite').controller("EditInterviewController", function ($scope, $http, $timeout, $location, InterviewsService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.currentPage = 1;
    $scope.entryLimit = 10;

    InterviewsService.getInterview($scope.id).then(function (results) {
        $scope.interview = results.data
    }, function (error) {
        console.log(error.data.message);
    });

    var _getInterviewQuestions = function () {
        InterviewsService.getInterviewQuestionsByInterviewId($scope.id).then(function (results) {
            $scope.interviewQuestions = results.data;

            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.interviewQuestions.length; //Initially for no filter
            $scope.totalItems = $scope.interviewQuestions.length;

        }, function (error) {
            console.log(error.data.message);
        });
    };

    _getInterviewQuestions();

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.sort_by = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    $scope.deleterecords = function (data) {
        InterviewsService.deleteInterviewQuestion(data.interviewId, data.id).then(function (results) {
            _getInterviewQuestions();
        }, function (error) {
            console.log(error.data.message);
        });
    };
});