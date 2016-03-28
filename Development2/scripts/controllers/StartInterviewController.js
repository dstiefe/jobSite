/**
 * Created by Van on 07.03.2016.
 */
angular.module('Jobsite').controller("StartInterviewController", function($scope,  $http, $timeout, $location, AuthService, InterviewsService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.jobId =   $stateParams.jobId;
    $scope.resumeId =   $stateParams.resumeId;
    $scope.interviewId =   $stateParams.interviewId;


    $scope.interview ={};

    if (!AuthService.authentication.isAuth || !AuthService.authentication.isUser)
    {
        var path = $location.path();
        sessionStorage.setItem("return_url", path);
        $state.transitionTo('login');
    }
    else
    {
            $scope.isDisabledStart = false;
            $scope.error_message = '';

        InterviewsService.getInterviewByResumeId($scope.jobId, $scope.resumeId, $scope.interviewId).then(function (results) {
                $scope.interview  = results.data;
                if ( $scope.interview.questionsCount == 0){
                    $scope.error_message = 'Interview does not have any questions! Please try again later!';
                    $scope.isDisabledStart = true;
                }
            }, function (error) {
                console.log(error.data.message);
            });

            $scope.start = function() {
                $scope.error_message = '';
                if ( $scope.interview.questionsCount == 0){
                    $scope.error_message = 'Interview does not have any questions!';
                    return;
                }
                if (!$scope.interview.isPassed)
                {
                    $state.go('testinterview', {'jobId': $scope.jobId, 'resumeId': $scope.resumeId, 'interviewId': $scope.interviewId});
                }else{
                    $scope.error_message = 'You have already passed interview!';
                }
            }
    }
});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
