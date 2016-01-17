/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller("SearchResumesHomeController", function($scope, AuthService, $location, SearchResumesParameters) {
    $scope.searchText = ''

    $scope.search = function () {
        SearchResumesParameters.searchText = $scope.searchText ;
        $location.path('/searchresumes');
    };
})