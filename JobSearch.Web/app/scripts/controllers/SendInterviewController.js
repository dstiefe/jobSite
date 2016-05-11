/**
 * Created by Van on 23.02.2016.
 */
//Controller for sending interview
angular.module('Jobsite').controller('SendInterviewController', function ($scope, $modalInstance, JobsService, $state, InterviewsService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;
    $scope.interviews = [];
    $scope.interviewSelected = '';
    $scope.successMessage = false;
    $scope.errorMessage = false;

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });

    InterviewsService.getInterviews().then(function (results) {
        response = results.data;
        $scope.interviews = response.filter(function (item) {
            return item.jobsIds.indexOf(jobId) != -1;
        });
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.onClose = function () {
        $modalInstance.close();
    };

    $scope.notify = function () {
        InterviewsService.notifyInterviewCandidate(jobId, $scope.resume.id).then(function (results) {
            $scope.successMessage = true;
        }, function (error) {
            $scope.errorMessage = true;
        });
    };

    $scope.startInterview = function (isValid) {
        if (!isValid) {
            $scope.errorMessage = true;
            return;
        }

        InterviewsService.sendInterviewRequestToResume(jobId, $scope.resume.id, {"interviewId": $scope.interviewSelected}).then(function (results) {
            //    $scope.successMessage = true;
            $timeout(function () {
                $modalInstance.close();
                $state.go('testinterview', {
                    'jobId': jobId,
                    'resumeId': $scope.resume.id,
                    'interviewId': $scope.interviewSelected
                });

            }, 1000);
        }, function (error) {
            $scope.errorMessage = true;
        });
    };

});