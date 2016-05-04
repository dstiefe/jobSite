/**
 * Created by Van on 04.02.2016.
 */

//Controller for testing interview
angular.module('Jobsite').controller("TestInterviewController", function($scope, $rootScope,  $http, $timeout, $location, InterviewsService, CategoriesService, ResumesService, $state, $stateParams) {


    $scope.jobId =   $stateParams.jobId;
    $scope.resumeId =   $stateParams.resumeId;
    $scope.interviewId =   $stateParams.interviewId;
    $scope.successMessage='';
    $scope.errorMessage='';

    $scope.interview = {};
    $scope.interviewQuestions = {};
    $scope.resultQuestions = [];

    InterviewsService.getInterviewByResumeId($scope.jobId, $scope.resumeId, $scope.interviewId).then(function (results) {
        $scope.interview  = results.data;
        if ( $scope.interview.questionsCount == 0){
            $scope.errorMessage = 'Interview does not have any questions! Please try again later!';
        }
        InterviewsService.getInterviewQuestions($scope.jobId, $scope.resumeId, $scope.interviewId).then(function (results) {
            $scope.interviewQuestions  = results.data;
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
        InterviewsService.setAnswersOnInterviewQuestions($scope.jobId, $scope.resumeId, $scope.interviewId, data).then(function (results) {
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
