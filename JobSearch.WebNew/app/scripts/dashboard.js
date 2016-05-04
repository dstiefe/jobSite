angular.module('Jobsite').controller("dashboardController", function ($rootScope, $scope, ValiDatedTokenObject, AuthService) {
    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";
});