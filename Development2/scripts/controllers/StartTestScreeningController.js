/**
 * Created by Van on 04.02.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("StartTestScreeningController", function($scope,  $http, $timeout, $location, AuthService, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {


    if (!AuthService.authentication.isAuth || !AuthService.authentication.isUser)
    {
        var path = $location.path();
        sessionStorage.setItem("return_url", path);
        $state.transitionTo('login');
    }
    else{
        $scope.error_message = '';
        $scope.resumeId = $stateParams.id;
        $scope.screeningId = $stateParams.screeningId;
        $scope.jobId = $stateParams.jobId;
        $scope.resume = {};
        $scope.screening = {};
        $scope.error_message = '';
        $scope.isDisabledStart = false;
        ResumesService.getApplicant($scope.jobId, $scope.resumeId).then(function (results) {
            $scope.resume  = results.data;
        }, function (error) {
            console.log(error.data.message);
        });

        ScreeningsService.getScreeningByResumeId($scope.jobId, $scope.resumeId, $scope.screeningId).then(function (results) {
            $scope.screening  = results.data;
            if ( $scope.screening.questionsCount == 0){
                $scope.error_message = 'Screening does not have any questions! Please try again later!';
                $scope.isDisabledStart = true;
            }
        }, function (error) {
            console.log(error.data.message);
        });

        $scope.start = function() {
            $scope.error_message = '';
                if ( $scope.screening.questionsCount == 0){
                    $scope.error_message = 'Screening does not have any questions!';
                    return;
                }

                if ($scope.resume.screeningIds != null && $scope.resume.screeningIds.length > 0){
                    var passedScreeningIds = [];
                    if ($scope.resume.passedScreeningIds != null){
                        passedScreeningIds = $scope.resume.passedScreeningIds;
                    }

                    var diff = $scope.resume.screeningIds.diff(passedScreeningIds);
                    if (diff.length > 0 && diff.indexOf($scope.screeningId) != -1)
                    {
                        $state.go('testscreening', {'id': $scope.resumeId, 'screeningId': $scope.screeningId, 'jobId':$scope.jobId});
                    }else{
                        $scope.error_message = 'You have already passed screening!';
                    }
                }else{
                    $scope.error_message = 'You don not have any screenings!';
                }
        }

    }
});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
