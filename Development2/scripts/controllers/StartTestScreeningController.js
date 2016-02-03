/**
 * Created by Van on 04.02.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("StartTestScreeningController", function($scope, Login, $http, $timeout, $location, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.resumeId = $stateParams.id;
    $scope.resume = {};

    ResumesService.getResume($scope.resumeId).then(function (results) {
        $scope.resume  = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.start = function() {

        if ($scope.resume.screeningIds.length > 0){
            $state.go('testscreening', {'id': $scope.resumeId, 'screeningId': $scope.resume.screeningIds[0]});
        }
    }
});