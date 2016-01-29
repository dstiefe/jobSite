/**
 * Created by Van on 28.01.2016.
 */
angular.module('Jobsite').controller("ResetPasswordController", function($scope, $http, $timeout, ValiDatedTokenObject, $location, AuthService, RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;

    $scope.usernameOrEmail='';

    $scope.error_Description='';
    $scope.success_Description='';

    $scope.ResetPassword = function(isValid){
        $scope.error_Description='';
        $scope.success_Description='';
        if (!isValid){
            return;
        }

        var data = {
            usernameOrEmail: $scope.usernameOrEmail
        };


        AuthService.resetPasswordToken(data).then(function (results) {
            $scope.success_Description= 'We sent a password-reset link to your email!';
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
