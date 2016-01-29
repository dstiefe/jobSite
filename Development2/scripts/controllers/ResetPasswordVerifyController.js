/**
 * Created by Van on 28.01.2016.
 */
angular.module('Jobsite').controller("ResetPasswordVerifyController", function($scope, $http, $timeout, ValiDatedTokenObject, $location, AuthService, RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;

    var searchObject = $location.search();

    $scope.password='';
    $scope.confirmPassword='';
    $scope.error_Description ='';
    $scope.success_Description = '';

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);

            $location.path('/login');
        }, 2000);
    };

    $scope.ChangePassword = function(isValid){
        $scope.error_Description ='';
        $scope.success_Description = '';
        if (!isValid){
            return;
        }
        if ($scope.password != $scope.confirmPassword){
            $scope.error_Description = "Passwords does not match!";
            return;
        }


        var data = {
            newPassword: $scope.password,
            userId: searchObject.userid,
            code: searchObject.code
        };
        AuthService.resetPassword(data).then(function (results) {
            $scope.success_Description = 'Password successfully changed, you will be redicted to login page in 2 seconds.';
            startTimer();
        }, function (response) {

            var errors = [];
            for (var key in response.data.ModelState) {
                for (var i = 0; i < response.data.ModelState[key].length; i++) {
                    errors.push(response.data.ModelState[key][i]);
                }
            }

            $scope.error_Description = "Failed to reset password due to: " + errors.join(' ');
        });
    };



});

