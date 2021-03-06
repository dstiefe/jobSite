﻿//Controller for associating accounts
angular.module('Jobsite').controller('associateController', ['$scope', '$rootScope', '$location', '$timeout', 'AuthService', function ($scope, $rootScope, $location, $timeout, AuthService) {

    if (AuthService.authentication.isAuth) {
        $location.path('/dashboard');
    }
    else {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registerData = {
            userName: AuthService.externalAuthData.userName,
            email: AuthService.externalAuthData.email,
            provider: AuthService.externalAuthData.provider,
            externalAccessToken: AuthService.externalAuthData.externalAccessToken,
            firstName: AuthService.externalAuthData.firstName,
            lastName: AuthService.externalAuthData.lastName,
            isEmployer: false,
            industryId: ""
        };

        $scope.registerExternal = function () {


            AuthService.registerExternal($scope.registerData).then(function (response) {
                    $scope.savedSuccessfully = true;
                    $scope.message = "User has been registered successfully, you will be redicted to dashboard page in 2 seconds.";
                    startTimer();
                },
                function (response) {
                    var errors = [];
                    for (var key in response.ModelState) {
                        errors.push(response.ModelState[key]);
                    }
                    $scope.message = "Failed to register user due to:" + errors.join(' ');
                });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                var return_url = sessionStorage.getItem("return_url");
                if (return_url != null) {
                    sessionStorage.removeItem("return_url");
                    $location.path(return_url);
                } else {
                    $location.path('/dashboard');
                }

            }, 2000);
        }

    }

}]);