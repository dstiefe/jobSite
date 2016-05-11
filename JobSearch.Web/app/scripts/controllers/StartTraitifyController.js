/**
 * Created by Van on 25.03.2016.
 */
//Controller for starting traitify test
angular.module('Jobsite').controller("StartTraitifyController", function ($scope, $http, $timeout, $location, AuthService, TraitifyService, $state, $stateParams) {


    if (!AuthService.authentication.isAuth || !AuthService.authentication.isUser) {
        var path = $location.path();
        sessionStorage.setItem("return_url", path);
        $state.transitionTo('login');
    }
    else {
        $scope.error_message = '';
        $scope.jobId = $stateParams.jobId;
        $scope.resumeId = $stateParams.resumeId;
        $scope.traitifyId = $stateParams.traitifyId;

        TraitifyService.getTraitify($scope.jobId, $scope.resumeId, $scope.traitifyId).then(function (results) {
            $scope.traitify = results.data;
        }, function (error) {
            console.log(error.data.message);
        });

        $scope.start = function () {
            $scope.error_message = '';
            if ($scope.traitify.slidesCount == 0) {
                $scope.error_message = 'Test does not have any questions!';
                return;
            }
            if (!$scope.traitify.isFinish) {
                $state.go('traitify', {
                    'resumeId': $scope.resumeId,
                    'traitifyId': $scope.traitifyId,
                    'jobId': $scope.jobId
                });
            } else {
                $scope.error_message = 'You have already passed test!';
            }
        }
    }
});

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};

