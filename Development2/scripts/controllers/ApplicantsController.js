/**
 * Created by Van on 16.01.2016.
 */
angular.module('Jobsite').controller("ApplicantsController", function($scope, $http, $timeout, ValiDatedTokenObject, $location, AuthService, RESOURCES, $stateParams) {
    var serviceBase = RESOURCES.API_BASE_PATH;
    var jobId = $stateParams.id;
    var req = {
        method: 'GET',
        url: serviceBase + 'jobs/'+ jobId +'/resumes',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
        }
    }
    $http(req).then(function(data) {
        if (data.status == "200") {
            $scope.list = data.data;
            console.log($scope.list);
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
            url: ServicesURL + 'api/v1/jobs/' + id,
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