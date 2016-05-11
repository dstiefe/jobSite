/**
 * Created by Van on 28.03.2016.
 */
//Controller for showing cover
angular.module('Jobsite').controller('ShowCoverController', function ($scope, $modalInstance, JobsService, $state, $sce, $timeout, JobsService, $document, resume, jobId) {

    $scope.resume = resume;
    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.onClose = function () {
        $modalInstance.close();
    };

});