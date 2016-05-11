/**
 * Created by Van on 03.02.2016.
 */
//Controller for working with screenings
angular
    .module('Jobsite').controller("ScreeningsController", function ($scope, $http, $timeout, $location, ScreeningsService) {

    $scope.currentPage = 1;

    ScreeningsService.getMyScreenings().then(function (results) {
        $scope.list = results.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter
        $scope.totalItems = $scope.list.length;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.deleterecords = function (record) {
        ScreeningsService.deleteScreening(record.id).then(function (results) {
            $scope.list.splice($scope.list.indexOf(record), 1);
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.filter = function () {
        $timeout(function () {
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };

    $scope.sort_by = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

});
