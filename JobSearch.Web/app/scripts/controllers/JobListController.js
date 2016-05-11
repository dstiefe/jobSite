//Controller for working job list
angular.module('Jobsite').controller("JobListController", function ($scope, $http, $timeout, $location, RESOURCES, AuthService, JobsService) {

    var serviceBase = RESOURCES.API_BASE_PATH;
    $scope.currentPage = 1;
    $scope.entryLimits = [5, 10, 20, 50, 100];

    if (!AuthService.authentication.isAuth) {
        $location.path("/login");
    }

    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";

    var _getMyJobs = function () {
        JobsService.getMyJobs().then(function (results) {
            $scope.list = results.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
        }, function (error) {
            console.log(error.data.message);
        });
    };

    _getMyJobs();

    $scope.deleterecords = function (id) {
        JobsService.deleteJob(id).then(function (results0) {
            _getMyJobs();
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