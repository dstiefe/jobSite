/**
 * Created by Van on 23.02.2016.
 */
//Controller for sending reference request
angular.module('Jobsite').controller('SendReferenceRequestController', function ($scope, $modalInstance, JobsService, ReferralService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;

    $scope.referencesTaken = [];
    $scope.referencesToTake = [];
    $scope.referencesAll = [];
    $scope.referencesToTakeSelected = [];
    $scope.successMessage = false;
    $scope.errorMessage = false;

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });


    ReferralService.getMyJobReferrals().then(function (results) {
        response = results.data;
        $scope.referencesAll = response.filter(function (item) {
            if (item.jobsIds == null)
                return false;
            return item.jobsIds.indexOf(jobId) != -1;
        });

        $scope.referencesTaken = $scope.referencesAll.filter(function (item) {
            if ($scope.resume.referencesIds == null)
                return false;
            return item.jobsIds.indexOf(jobId) != -1 && $scope.resume.referencesIds.indexOf(item.id) != -1;
        });

        $scope.referencesToTake = $scope.referencesAll.filter(function (item) {
            if ($scope.resume.referencesIds == null)
                return true;
            return item.jobsIds.indexOf(jobId) != -1 && $scope.resume.referencesIds.indexOf(item.id) == -1;
        });


    }, function (error) {
        console.log(error.data.message);
    });


    $scope.onClose = function () {
        $modalInstance.close();
    };

    $scope.notify = function () {
        ReferralService.sendReferenceRequestToResume(jobId, $scope.resume.id, {"jobReferralIds": $scope.referencesToTakeSelected}).then(function (results) {
            $scope.successMessage = true;
            $timeout(function () {
                $modalInstance.close();
            }, 1000);
        }, function (error) {
            $scope.errorMessage = true;
        });
    };


});