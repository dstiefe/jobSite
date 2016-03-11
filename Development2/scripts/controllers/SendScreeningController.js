/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('SendScreeningController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;

    $scope.screeningsTaken = [];
    $scope.screeningsToTake = [];
    $scope.screeningsAll = [];
    $scope.screeningsToTakeSelected = [];
    $scope.successMessage =false;
    $scope.errorMessage =false;

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });


    ScreeningsService.getMyScreenings().then(function (results) {
        response = results.data;
        $scope.screeningsAll = response;

        $scope.screeningsTaken =   $scope.screeningsAll.filter(function(item) {
            if ($scope.resume.screeningIds == null)
                return false;
            return item.jobsIds.indexOf(jobId) != -1 && $scope.resume.screeningIds.indexOf(item.id) != -1;
        });

        $scope.screeningsToTake =   $scope.screeningsAll.filter(function(item) {
            if ($scope.resume.screeningIds == null)
                return true;
            return item.jobsIds.indexOf(jobId) != -1 && $scope.resume.screeningIds.indexOf(item.id) == -1;
        });


    }, function (error) {
        console.log(error.data.message);
    });


    $scope.onClose = function() {
        $modalInstance.close();
    };

    $scope.notify = function() {
        ScreeningsService.sendScreeningsToResume(jobId, $scope.resume.id, {"screeningIds": $scope.screeningsToTakeSelected}).then(function (results) {
            $scope.successMessage = true;
            $timeout(function() {
                $modalInstance.close();
            }, 1000);
        }, function (error) {
            $scope.errorMessage = true;
        });
    };


});