angular.module('Jobsite').controller("dashboardController", function ($rootScope, $scope, AuthService) {

    debugger;
    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";
});