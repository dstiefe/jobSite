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


/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  




angular
    .module('Jobsite').controller("dashboardController", function($scope, Login, ValiDatedTokenObject, locationHistoryService, $location, $modal, $http, $timeout) {
       /*ValiDatedTokenObject.ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
         if (ValiDatedTokenObject.ValiDatedTokenObject == null || ValiDatedTokenObject.ValiDatedTokenObject.access_token == "") {
            $location.path("/login");
        }*/

         ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
        if (ValiDatedTokenObject.getValiDatedTokenObject() == null || ValiDatedTokenObject.getValiDatedTokenObject().access_token == "") {
            $location.path("/login");
        }
        $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;

    $scope.jobYouOwnAlert = false;
        $scope.jobAlreadyAppliedAlert = false;
        $scope.jobAppliedSuccessfullyAlert = false;
        var previousLocationPath = locationHistoryService.get().split('/').pop().split("?");
        var parts = $location.absUrl().split("dashboard?id=");
        if (((previousLocationPath[0] == "login") || (previousLocationPath[0] == "viewjobdetails")) && (parts[1] != undefined)) {
            var reqForJobAlreadyApplied = {
                method: 'GET',
                url: ServicesURL + 'api/v1/jobs/' + parts[1],
                headers: {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                }
            }
            $http(reqForJobAlreadyApplied).then(function(data) {
                if (data.status == "200") {
                    if (data.data.isOwn) {
                        $scope.jobYouOwnAlert = true;
                    } else 
                    if (data.data.isApplied) {
                        $scope.jobAlreadyAppliedAlert = true;
                    } else {
                        $modal.open({
                            templateUrl: 'views/applyjob.html',
                            controller: ApplyJobController
                        });
                    }

                }
            });

        }

    var serviceUrl = ServicesURL + 'api/v1/jobs/all/applied';
    if (ValiDatedTokenObject.getValiDatedTokenObject().roles == "Admin") {
        serviceUrl =ServicesURL + 'api/v1/jobs/my';

    }
        var req = {
            method: 'GET',
            url: serviceUrl,
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }
        $http(req).then(function(data) {
            $scope.list = [];
            if (data.status == "200") {
                if (ValiDatedTokenObject.getValiDatedTokenObject().roles == "User") {
                    $scope.list = data.data;
                    $scope.headingmessage = "Jobs Applied To";
                    $scope.viewtext = "View Job";
                } else {
                    $scope.list = data.data;
                    $scope.headingmessage = "Jobs Posted";
                    $scope.viewtext = "View Applicants";
                } 
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 10; //max no of items to display in a page
                $scope.filteredItems = $scope.list.length; //Initially for no filter  
                $scope.totalItems = $scope.list.length;
            }
        });

    })
