/**
 * Created by Van on 25.03.2016.
 */
/**
 * Created by Van on 04.02.2016.
 */
angular.module('Jobsite').controller("FinishTraitifyController", function($scope, Login, $http, $timeout, $location, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.close = function(){
        $state.go('dashboard');
    };

});
