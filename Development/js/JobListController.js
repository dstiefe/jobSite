/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" /> 
app.filter('startFrom', function () {  return function (input, start) {
        if (input) {            start = +start;  return input.slice(start); } return []; }
});
app.controller("JobListController", function ($scope, Login, $http, $timeout) {
    ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
    if (ValiDatedTokenObject == null || ValiDatedTokenObject.access_token == "") {
        window.location = "/login.html";
    } 
    var req = {
        method: 'GET', url: ServicesURL + 'api/v1/jobs/my',
        headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive', 'Authorization': Authorizationtoken }
    } 
    $http(req).then(function (data) {
        if (data.status == "200") {
            $scope.list = data.data;
            console.log($scope.list);
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter  
            $scope.totalItems = $scope.list.length; 
        }
    });
    $scope.deleterecords = function (id) {
        console.log(id);
        $http({
            method: 'DELETE', url: ServicesURL + 'api/v1/jobs/' + id, 
            headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive', 'Authorization': Authorizationtoken }
        }).
   success(function (response) {
       $http(req).then(function (data) {
           if (data.status == "200") {
               $scope.list = data.data;
               console.log($scope.list);
               $scope.currentPage = 1; //current page
               $scope.entryLimit = 10; //max no of items to display in a page
               $scope.filteredItems = $scope.list.length; //Initially for no filter  
               $scope.totalItems = $scope.list.length;
           }
       });
       console.log(response);
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
    
})

