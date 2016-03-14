/**
 * Created by Van on 04.02.2016.
 */

angular.module('Jobsite').controller("TestJobReferralController", function($scope, $rootScope, Login, $http, $timeout, $location, ReferralService, CategoriesService, ResumesService, $state, $stateParams) {


    $scope.jobId =   $stateParams.jobId;
    $scope.resumeId =   $stateParams.resumeId;
    $scope.jobReferralId =   $stateParams.jobReferralId;
    $scope.successMessage='';
    $scope.errorMessage='';

    $scope.reference = {};
    $scope.referenceQuestions = {};
    $scope.resultQuestions = [];

    ReferralService.getReferenceByResumeId($scope.jobId, $scope.resumeId, $scope.jobReferralId).then(function (results) {
        $scope.reference  = results.data;
        ReferralService.getReferenceQuestions($scope.jobId, $scope.resumeId, $scope.jobReferralId).then(function (results) {
            $scope.referenceQuestions  = results.data;
        }, function (error) {
            console.log(error.data.message);
        });
    }, function (error) {
        console.log(error.data.message);
    });




    $scope.saveChanges = function(isValid) {
        $scope.successMessage='';

        if (!isValid){
            $scope.errorMessage='Please fill out all mandatory fields!';
            return;
        }
        $scope.errorMessage='';
        var data = {'results': $scope.resultQuestions};
        ReferralService.setAnswersOnReferenceQuestions($scope.jobId, $scope.resumeId, $scope.jobReferralId, data).then(function (results) {
            $scope.successMessage='Successfully saved!';

            $timeout(function() {
                $state.go('dashboard');
            }, 1000);

        }, function (error) {
            $scope.errorMessage='Error occured';
            console.log(error.data.message);
        });
    }

});
