/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" /> 

angular
    .module('Jobsite').controller("JobListController", function($scope, Login, $http, $timeout, $location, ValiDatedTokenObject,RESOURCES) {
        /*ValiDatedTokenObject.ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
         if (ValiDatedTokenObject.ValiDatedTokenObject == null || ValiDatedTokenObject.ValiDatedTokenObject.access_token == "") {
            $location.path("/login");
        }*/
    var serviceBase = RESOURCES.API_BASE_PATH;
        $scope.currentPage = 1;
        if (sessionStorage.getItem("ValiDatedTokenObject") == null || sessionStorage.getItem("ValiDatedTokenObject")=="") {
            $location.path("/login");
        }
         ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
        if (ValiDatedTokenObject.getValiDatedTokenObject() == null || ValiDatedTokenObject.getValiDatedTokenObject().access_token == "") {
            $location.path("/login");
        }
        $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
        var req = {
            method: 'GET',
            url: serviceBase + 'jobs/my',
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }
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
                url: serviceBase + 'jobs/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
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

    })
