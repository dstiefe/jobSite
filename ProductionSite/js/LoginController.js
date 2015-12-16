

/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  




app.controller("Login", function ($scope, Login) {

    $scope.UserLogin = function () {
        debugger;
        var username = $scope.username;
        var password = $scope.password;
        var data = 'grant_type=password&username=' + username + '&password=' + password + '';
        $('.splash').show();
        var PostRequest = Login.AuthorizeToken(data);
        PostRequest.then(function (RequestResult) {
            if (RequestResult.status === 200) {
                ValiDatedTokenObject.access_token = RequestResult.data.access_token;
                ValiDatedTokenObject.token_type = RequestResult.data.token_type;
                ValiDatedTokenObject.expires_in = RequestResult.data.expires_in;
                ValiDatedTokenObject.userName = RequestResult.data.userName;
                ValiDatedTokenObject.issued = RequestResult.data.issued;
                ValiDatedTokenObject.expires = RequestResult.data.expires;
                sessionStorage.setItem("ValiDatedTokenObject", JSON.stringify(ValiDatedTokenObject));
                window.location = "Jobs/dashboard.html";
            }
        },
        function (error) {
            $('.splash').hide();
            if (error.status === 400) {
                $scope.error_Description = error.data.error_description;
            }
        })

    };



})

