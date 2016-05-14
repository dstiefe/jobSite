/**
 * Created by Van on 03.02.2016.
 */
//Controller for editing screening
angular.module('Jobsite').controller("EditScreeningController", function ($scope, $http, $timeout, $location, ScreeningsService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.currentPage = 1;
    $scope.entryLimits = [5, 10, 20, 50, 100];
    $scope.entryLimit = 10;


    ScreeningsService.getScreening($scope.id).then(function (results) {
        $scope.screening = results.data
    }, function (error) {
        console.log(error.data.message);
    });

    var _getScreeningQuestions = function () {
        ScreeningsService.getScreeningQuestionsByScreeningId($scope.id).then(function (results) {
            $scope.screeningQuestions = results.data;

            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.screeningQuestions.length; //Initially for no filter
            $scope.totalItems = $scope.screeningQuestions.length;

        }, function (error) {
            console.log(error.data.message);
        });
    };
    _getScreeningQuestions();

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.sort_by = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    $scope.deleterecords = function (data) {
        ScreeningsService.deleteScreeningQuestion(data.screeningId, data.id).then(function (results) {
            _getScreeningQuestions();
        }, function (error) {
            console.log(error.data.message);
        });
    };

});