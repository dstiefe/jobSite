

/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  

app.controller("AuthController", function ($scope, AuthController) {
    
    $scope.ValidateToken = function () {
        var data = 'grant_type=password&username=ivan&password=123456';
        var PostRequest = AuthController.AuthorizeToken(data);
        PostRequest.then(function (RequestResult) {
            debugger;
        },
        function (err) {
            console.log("Some error Occured" + err);
        })

    };



})

