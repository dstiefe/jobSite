/**
 * Created by Van on 17.03.2016.
 */
angular.module('Jobsite').controller('AgreementController', function ($scope, $modalInstance, $sce, $timeout, $document) {

    $scope.resume = resume;

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });


    ScreeningsService.getTestResultsByResumeId(jobId, $scope.resume.id).then(function (results) {
        response = results.data;
        $scope.results = response;
    }, function (error) {
        console.log(error.data.message);
    });
    $scope.onClose = function() {
        $modalInstance.close();
    }

});