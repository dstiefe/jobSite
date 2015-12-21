/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  

angular
    .module('Jobsite').controller("AuthController", function($scope, Login) {

        $scope.ValidateToken = function() {
            var data = 'grant_type=password&username=ivan&password=123456';
            var PostRequest = Login.AuthorizeToken(data);
            PostRequest.then(function(RequestResult) {
                    debugger;
                },
                function(err) {
                    console.log("Some error Occured" + err);
                })

        };



    })
