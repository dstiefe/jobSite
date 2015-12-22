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
    .module('Jobsite').controller("dashboardController", function($scope, Login, $modal) {
            var parts = $location.absUrl().split("dashboard?id=");
            if ((parts[1] != undefined) {
                    $modal.open({
                        templateUrl: 'views/applyjob.html',
                        controller: ApplyJobController
                    });
                }


            })
