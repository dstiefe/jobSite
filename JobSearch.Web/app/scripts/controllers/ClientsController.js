//Controller for working with clients
angular.module('Jobsite').controller("ClientsController", function ($scope, $http, $timeout, $location, RESOURCES, ClientsService) {

    $scope.currentPage = 1;
    $scope.entryLimits = [5, 10, 20, 50, 100];

    ClientsService.getClients().then(function (results) {
        $scope.list = results.data;

        for (var i = 0; i < $scope.list.length; i++)
            $scope.list[i].personalName = $scope.list[i].firstName + ' ' + $scope.list[i].lastName;

        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter
        $scope.totalItems = $scope.list.length;

    }, function (error) {
        console.log(error.data.message);
    });

    $scope.deleterecords = function (record) {
        ClientsService.deleteClient(record.id).then(function (results) {
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
