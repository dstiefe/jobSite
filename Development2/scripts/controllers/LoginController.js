/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  




angular
    .module('Jobsite').controller("Login", function($scope, Login, $location, locationHistoryService,ValiDatedTokenObject) {
        sessionStorage.removeItem("ValiDatedTokenObject");
        $scope.UserLogin = function() {
            console.log("login click");
            var username = $scope.username;
            var password = $scope.password;
            var data = 'grant_type=password&username=' + username + '&password=' + password + '';
            //$('.splash').show();
            var PostRequest = Login.AuthorizeToken(data);
            PostRequest.then(function(RequestResult) {
                    if (RequestResult.status === 200) {debugger;

                        ValiDatedTokenObject.setValiDatedTokenObject(RequestResult.data);
                        /*ValiDatedTokenObject.ValiDatedTokenObject.access_token = RequestResult.data.access_token;
                        ValiDatedTokenObject.ValiDatedTokenObject.token_type = RequestResult.data.token_type;
                        ValiDatedTokenObject.ValiDatedTokenObject.expires_in = RequestResult.data.expires_in;
                        ValiDatedTokenObject.ValiDatedTokenObject.userName = RequestResult.data.userName;
                        ValiDatedTokenObject.ValiDatedTokenObject.issued = RequestResult.data.issued;
                        ValiDatedTokenObject.ValiDatedTokenObject.expires = RequestResult.data.expires;
                        ValiDatedTokenObject.ValiDatedTokenObject.role = RequestResult.data.expires;
                        ValiDatedTokenObject.ValiDatedTokenObject.id = RequestResult.data.userId;*/
                        sessionStorage.setItem("ValiDatedTokenObject", JSON.stringify(ValiDatedTokenObject.getValiDatedTokenObject()));
                        $location.path("/dashboard");
                    }
                },
                function(error) {
                    //$('.splash').hide();
                    if (error.status === 400) {
                        $scope.error_Description = error.data.error_description;
                    }
                })

        };



    })
angular
    .module('Jobsite').controller("logoutcontroller",
    function ($scope, Login, $location, locationHistoryService, ValiDatedTokenObject) {
        sessionStorage.removeItem("ValiDatedTokenObject");
        $location.path('/searchjobs');
    });