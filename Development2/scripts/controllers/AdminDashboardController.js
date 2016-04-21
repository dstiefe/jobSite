/**
 * Created by Van on 02.04.2016.
 */
//Controller for working with admin dashboard
angular.module('Jobsite').controller("AdminDashboardController", function ($rootScope, $scope, ValiDatedTokenObject, $location, $modal, $http, $timeout, AuthService, JobsService, ReferralService, RESOURCES, cfpLoadingBar) {
    if (!AuthService.authentication.isAdministrator)
    {
        $location.path("/login");
    }
    else {
        $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";
        $scope.entryLimits = [5, 10, 15, 20, 25];
        $scope.isLoading = true;
        var serviceBase = RESOURCES.API_BASE_PATH;
        var _pageCalc = function () {
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
        };

        $scope.headingmessage = "Jobs Posted";
        $scope.viewtext = "View Applicants";
        $scope.jobsNotFoundMessage = "No jobs";
        JobsService.getMyJobs().then(function (results) {
            $scope.list = results.data;
            _pageCalc();
            $scope.isLoading = false;
        }, function (error) {
            console.log(error.data.message);
            $scope.isLoading = false;
        });

        $scope.deleterecords = function (id) {
            console.log(id);
            $http({ method: 'DELETE', url: serviceBase + 'jobs/' + id, headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive', 'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type + " " + ValiDatedTokenObject.getValiDatedTokenObject().access_token } }).
            success(function (response) {
                JobsService.getMyJobs().then(function (results) {
                    $scope.list = results.data;
                    _pageCalc();
                }, function (error) {
                    console.log(error.data.message);
                });
            });
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
    }





});