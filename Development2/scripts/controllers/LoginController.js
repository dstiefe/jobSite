/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  


angular.module('Jobsite').controller("Login", function($scope, $rootScope, Login, $location, locationHistoryService,ValiDatedTokenObject, AuthService, RESOURCES, $modal) {

    $scope.UserLogin = function() {
            var loginData = {
                userName: $scope.username,
                password: $scope.password
            };

            AuthService.login(loginData).then(function (response) {

                var return_url = sessionStorage.getItem("return_url");
                if(return_url != null){
                    sessionStorage.removeItem("return_url");
                    $location.path(return_url);
                }else{
                    $location.path('/dashboard');
                }

                },
                function (err) {
                    if (err != null){
                        $scope.error_Description = err.error_description;
                    }
                    else{
                        $scope.error_Description = "Internal Server Error";
                    }
                });
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
                    externalAccessToken: fragment.external_access_token,
                    email: fragment.email,
                    firstName: fragment.first_name,
                    lastName: fragment.last_name
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                AuthService.obtainAccessToken(externalData).then(function (response) {
                        var return_url = sessionStorage.getItem("return_url");
                        if(return_url != null){
                            sessionStorage.removeItem("return_url");
                            $location.path(return_url);
                        }else{
                            $location.path('/dashboard');
                        }

                    },
                    function (err) {
                        $scope.message = err.error_description;
                    });
            }

        });
    };


    var showHelpWindow = function(templateName) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: templateName,
            controller: function(){

            },
            size : 'lg'
        });
    };

    $scope.showTerms = function() {
        showHelpWindow('views/TermsView.html');
    };

    $scope.showPrivacy= function() {
        showHelpWindow('views/PrivacyView.html');
    };

});
