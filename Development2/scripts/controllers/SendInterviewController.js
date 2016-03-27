/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('SendInterviewController', function ($scope, $modalInstance, JobsService, InterviewsService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;

    $scope.interviewsTaken = [];
    $scope.interviewsToTake = [];
    $scope.interviewsAll = [];
    $scope.interviewsToTakeSelected = [];
    $scope.successMessage =false;
    $scope.errorMessage =false;

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });


    InterviewsService.getInterviews().then(function (results) {
        response = results.data;
        $scope.interviewsAll = response.filter(function(item) {
               return item.jobsIds.indexOf(jobId) != -1;
        });

        $scope.interviewsTaken =   $scope.interviewsAll.filter(function(item) {
            if ($scope.resume.interviewIds == null)
                return false;
            return item.jobsIds.indexOf(jobId) != -1 && $scope.resume.interviewIds.indexOf(item.id) != -1;
        });

        $scope.interviewsToTake =   $scope.interviewsAll.filter(function(item) {
            if ($scope.resume.interviewIds == null)
                return true;
            return item.jobsIds.indexOf(jobId) != -1 && $scope.resume.interviewIds.indexOf(item.id) == -1;
        });


    }, function (error) {
        console.log(error.data.message);
    });


    $scope.onClose = function() {
        $modalInstance.close();
    };

    $scope.notify = function() {
        InterviewsService.sendInterviewRequestToResume(jobId, $scope.resume.id, {"interviewIds": $scope.interviewsToTakeSelected}).then(function (results) {
            $scope.successMessage = true;
            $timeout(function() {
                $modalInstance.close();
            }, 1000);
        }, function (error) {
            $scope.errorMessage = true;
        });
    };


});