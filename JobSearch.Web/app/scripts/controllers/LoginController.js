//Controller for logging
angular.module('Jobsite').controller("Login", function ($scope, $rootScope, $location, AuthService, RESOURCES, $modal, $timeout) {

    if (AuthService.authentication.isAuth) {
        $location.path('/dashboard');

    }
    else {

        if (window.location.href.indexOf("register") > -1) {
            $scope.tabs = [{active: false}, {active: true}];
        }
        else {
            $scope.tabs = [{active: true}, {active: false}];
        }

        $scope.loginData = {
            userName: '',
            password: '',
            rememberMe: true
        };

        $scope.registerData = {
            firstName: '',
            lastName: '',
            email: '',
            emailRepeat: '',
            userName: '',
            password: '',
            passwordRepeat: '',
            isEmployer: false
        };

        $scope.login = function (isValid) {
            $scope.successRegisterMessage = '';
            $scope.errorRegisterDescription = '';
            $scope.errorLoginDescription = '';
            if (!isValid) {
                $scope.errorLoginDescription = "Please, fill out all fields!";
                return;
            }
            AuthService.login($scope.loginData).then(function (response) {
                    var return_url = sessionStorage.getItem("return_url");
                    if (return_url != null) {
                        sessionStorage.removeItem("return_url");
                        $location.path(return_url);
                    } else {
                        $location.path('/dashboard');
                    }
                },
                function (err) {
                    if (err != null) {
                        $scope.errorLoginDescription = err.error_description;
                    }
                    else {
                        $scope.errorLoginDescription = "Internal Server Error";
                    }
                });
        };

        $scope.register = function (isValid) {
            $scope.successRegisterMessage = '';
            $scope.errorRegisterDescription = '';
            $scope.errorLoginDescription = '';
            if (!isValid) {
                $scope.errorRegisterDescription = "Please, fill out all fields!";
                return;
            }
            AuthService.saveRegistration($scope.registerData).then(function (response) {


                    $scope.successRegisterMessage = "You have successfully register";

                    $timeout(function () {
                        $scope.successRegisterMessage = '';
                        $scope.tabs = [{active: true}, {active: false}];
                    }, 1000);
                },
                function (response) {

                    var errors = [];
                    for (var key in response.data.ModelState) {
                        for (var i = 0; i < response.data.ModelState[key].length; i++) {
                            errors.push(response.data.ModelState[key][i]);
                        }
                    }
                    $scope.errorRegisterDescription = "Failed to register user due to: " + errors.join(' ');

                });
        };

        $scope.authExternalProvider = function (provider) {

            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            if (location.pathname.indexOf('JobSearch.Web') != -1) {
                redirectUri = location.protocol + '//' + location.host + '/JobSearch.Web/authcomplete.html';
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
                    var externalData = {
                        provider: fragment.provider,
                        externalAccessToken: fragment.external_access_token
                    };
                    AuthService.obtainAccessToken(externalData).then(function (response) {
                            var return_url = sessionStorage.getItem("return_url");
                            if (return_url != null) {
                                sessionStorage.removeItem("return_url");
                                $location.path(return_url);
                            } else {
                                $location.path('/dashboard');
                            }

                        },
                        function (err) {
                            $scope.message = err.error_description;
                        });
                }

            });
        };

        var showHelpWindow = function (templateName) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: templateName,
                controller: function () {

                },
                size: 'lg'
            });
        };

        $scope.showTerms = function () {
            showHelpWindow('views/TermsView.html');
        };

        $scope.showPrivacy = function () {
            showHelpWindow('views/PrivacyView.html');
        };

    }
});
