angular.module('Jobsite').controller("dashboardController", function ($rootScope, $scope, ValiDatedTokenObject, locationHistoryService,  AuthService) {
    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";
});