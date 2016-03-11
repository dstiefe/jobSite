/**
 * Created by Van on 09.02.2016.
 */
angular.module('Jobsite').controller('TestResultController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });


    ScreeningsService.getTestResultsByResumeId($scope.resume.id).then(function (results) {
        response = results.data;
        $scope.results = response;
    }, function (error) {
        console.log(error.data.message);
    });
    $scope.onClose = function() {
        $modalInstance.close();
    }

});