angular.module('Jobsite').controller("dashboardController", function ($rootScope, $scope, AuthService) {
    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";
});