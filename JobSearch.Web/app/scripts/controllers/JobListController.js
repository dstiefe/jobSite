/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />

//Controller for working job list
angular.module('Jobsite').controller("JobListController", function($scope,  $http, $timeout, $location, RESOURCES, AuthService) {

    var serviceBase = RESOURCES.API_BASE_PATH;
        $scope.currentPage = 1;

        if (!AuthService.authentication.isAuth) {
            $location.path("/login");
        }

        $scope.role = AuthService.authentication.isAdministrator?"Admin":"User";
        var req = {
            method: 'GET',
            url: serviceBase + 'jobs/my'
        };
        $http(req).then(function(data) {
            if (data.status == "200") {
                $scope.list = data.data;
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 10; //max no of items to display in a page
                $scope.filteredItems = $scope.list.length; //Initially for no filter  
                $scope.totalItems = $scope.list.length;
            }
        });
        $scope.deleterecords = function(id) {
            console.log(id);
            $http({
                method: 'DELETE',
                url: serviceBase + 'jobs/' + id
            }).
            success(function(response) {
                $http(req).then(function(data) {
                    if (data.status == "200") {
                        $scope.list = data.data;
                        $scope.currentPage = 1; //current page
                        $scope.entryLimit = 10; //max no of items to display in a page
                        $scope.filteredItems = $scope.list.length; //Initially for no filter  
                        $scope.totalItems = $scope.list.length;
                    }
                });
            });

        };
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.filter = function() {
            $timeout(function() {
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };

        $scope.sort_by = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };

    });
