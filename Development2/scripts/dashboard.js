$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {

        ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
        if (ValiDatedTokenObject == null || ValiDatedTokenObject.access_token == "") {
            //window.location = "/login.html";
        }
    } else {
        alert('Sorry no web stroage support');
        //window.location = "/login.html";
    }

})

$(function() {
    $('#cmd_Logout').click(function() {
        sessionStorage.setItem("ValiDatedTokenObject", null);
        //window.location = "../login.html";
    })
})

angular.module('Jobsite').controller("dashboardController", function($scope, Login, ValiDatedTokenObject, locationHistoryService, $location, $modal, $http, $timeout, AuthService, JobsService, ReferralService, cfpLoadingBar) {
    $scope.isLoading = true;
    $scope.role = AuthService.authentication.isAdministrator ? "Admin": "User";

   $scope.entryLimits = [5,10,15,20,25];


   var _pageCalc = function(){
       $scope.currentPage = 1; //current page
       $scope.entryLimit = 10; //max no of items to display in a page
       $scope.filteredItems = $scope.list.length; //Initially for no filter
       $scope.totalItems = $scope.list.length;
   };

    if (AuthService.authentication.isAdministrator){

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

    }else{

        $scope.headingmessage = "Jobs Applied To";
        $scope.viewtext = "View Job";
        $scope.jobsNotFoundMessage = "No jobs found";

        JobsService.getJobsApplied().then(function (results) {
            $scope.list = results.data;

            ReferralService.getReferrals().then(function (results2) {
                $scope.list = $scope.list.concat(results2.data);
                _pageCalc();
                $scope.isLoading = false;
            }, function (error) {
                console.log(error.data.message);
                $scope.isLoading = false;
            });

        }, function (error) {
            console.log(error.data.message);
            $scope.isLoading = false;
        });
    }


    });
