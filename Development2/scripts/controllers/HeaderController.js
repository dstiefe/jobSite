angular.module('Jobsite').controller("HeaderController", function($rootScope, AuthService, $location) {
    function _updateMenu () {
        $rootScope.isAuth = AuthService.authentication.isAuth;
        $rootScope.isAdministrator = AuthService.authentication.isAdministrator;
        $rootScope.isUser = AuthService.authentication.isUser;
    }

    _updateMenu();

    $rootScope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };


})