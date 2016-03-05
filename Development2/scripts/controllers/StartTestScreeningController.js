/**
 * Created by Van on 04.02.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("StartTestScreeningController", function($scope, Login, $http, $timeout, $location, AuthService, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {


    if (!AuthService.authentication.isAuth || !AuthService.authentication.isUser)
    {
        var path = $location.path();
        console.log("path="+path);
        sessionStorage.setItem("return_url", path);
        $state.transitionTo('login');
    }
else{



    $scope.resumeId = $stateParams.id;
    $scope.screeningId = $stateParams.screeningId;
    $scope.resume = {};

    ResumesService.getResume($scope.resumeId).then(function (results) {
        $scope.resume  = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.start = function() {

            if ($scope.resume.screeningIds != null && $scope.resume.screeningIds.length > 0){
                var passedScreeningIds = [];
                if ($scope.resume.passedScreeningIds != null){
                    passedScreeningIds = $scope.resume.passedScreeningIds;
                }

                var diff = $scope.resume.screeningIds.diff(passedScreeningIds);
                if (diff.length > 0)
                {
                    $state.go('testscreening', {'id': $scope.resumeId, 'screeningId': $scope.screeningId});
                }
            }
    }

    }
});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
