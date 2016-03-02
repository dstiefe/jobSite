/**
 * Created by Van on 03.03.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("ScreeningAssignController", function($scope, Login, $http, $timeout, $location, ScreeningsService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.currentPage = 1;
    $scope.entryLimit = 10;
    ScreeningsService.getScreening($scope.id).then(function (results) {
        $scope.screening = results.data
    }, function (error) {
        console.log(error.data.message);
    });

    ScreeningsService.getScreeningQuestionsByScreeningId($scope.id).then(function (results) {
        $scope.screeningQuestions = results.data;

        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.screeningQuestions.length; //Initially for no filter
        $scope.totalItems = $scope.screeningQuestions.length;

    }, function (error) {
        console.log(error.data.message);
    });

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

});