/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  




angular
    .module('Jobsite').controller("Login", function($scope, Login, $location, locationHistoryService,ValiDatedTokenObject, AuthService, RESOURCES) {
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

    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        if (location.pathname.indexOf('Development2') != -1){
           redirectUri = location.protocol + '//' + location.host + '/Development2/authcomplete.html';
        }
       //


        var externalProviderUrl = RESOURCES.API_BASE_PATH + "Account/ExternalLogin?provider=" + provider
            + "&response_type=token&client_id=" + RESOURCES.CLIENT_ID
            + "&redirect_uri=" + redirectUri;

        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                AuthService.logOut();

                AuthService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                AuthService.obtainAccessToken(externalData).then(function (response) {

                        $location.path('/dashboard');

                    },
                    function (err) {
                        $scope.message = err.error_description;
                    });
            }

        });
    };

    })
angular
    .module('Jobsite').controller("logoutcontroller",
    function ($scope, Login, $location, locationHistoryService, ValiDatedTokenObject, AuthService) {
        AuthService.logOut();
        sessionStorage.removeItem("ValiDatedTokenObject");
        $location.path('/searchjobs');
    });