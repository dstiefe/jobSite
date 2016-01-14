angular.module('Jobsite').controller("HeaderController", function($scope, AuthService,$location) {


    $scope.isAuth = AuthService.authentication.isAuth;
    $scope.isAdministrator = AuthService.authentication.isAdministrator;
    $scope.isUser = AuthService.authentication.isUser;

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

})
