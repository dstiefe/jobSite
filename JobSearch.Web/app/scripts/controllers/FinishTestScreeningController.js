/**
 * Created by Van on 04.02.2016.
 */
//Controller for finishing test screening
angular.module('Jobsite').controller("FinishTestScreeningController", function ($scope, $http, $timeout, $location, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.close = function () {
        $state.go('dashboard');
    };
});