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
    .module('Jobsite').controller("dashboardController", function ($scope, Login, $location, $modal, $http, $timeout, ValiDatedTokenObject) {
            var parts = $location.absUrl().split("dashboard?id=");
            if (parts[1] != undefined) {
                    $modal.open({
                        templateUrl: 'views/applyjob.html',
                        controller: ApplyJobController
                    });
                }
            ValiDatedTokenObject.ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
            if (ValiDatedTokenObject.ValiDatedTokenObject == null || ValiDatedTokenObject.ValiDatedTokenObject.access_token == "") {
                $location.path("/login");
            }
            console.log(ValiDatedTokenObject);
            var req = {
                method: 'GET',
                url: ServicesURL + 'api/v1/jobs/all/applied',
                headers: {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Authorization': Authorizationtoken
                }
            }
            $http(req).then(function (data) {
                if (data.status == "200") {
                    if (ValiDatedTokenObject.role == "User") {
                        for (var k = 0; k < data.data.length; k++) {
                            if (data.data[k].userId == ValiDatedTokenObject.id) {
                                $scope.list.push(data.data[k]);
                            }
                        }
                        $scope.headingmessage = "Jobs Applied To";
                        $scope.viewtext = "Jobs Job";
                    } else {
                        $scope.list = data.data;
                        $scope.headingmessage = "Jobs Posted";
                        $scope.viewtext = "View Applicants";
                    }
                    console.log($scope.list);
                    $scope.currentPage = 1; //current page
                    $scope.entryLimit = 10; //max no of items to display in a page
                    $scope.filteredItems = $scope.list.length; //Initially for no filter  
                    $scope.totalItems = $scope.list.length;
                }
            });

            })
