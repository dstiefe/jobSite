/**
 * Created by Van on 25.03.2016.
 */
//Controller for traitify request
angular.module('Jobsite').controller('SendTraitifyRequestController', function ($scope, $modalInstance, JobsService, TraitifyService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;
    $scope.successMessage =false;
    $scope.errorMessage =false;
    $scope.slectedDeck = '';

    JobsService.getJob(jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });

    TraitifyService.getDecks().then(function (results) {
        $scope.decks = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.onClose = function() {
        $modalInstance.close();
    };

    $scope.notify = function() {
        TraitifyService.sendTraitify(jobId, $scope.resume.id, {"type": $scope.slectedDeck.type}).then(function (results) {
            $scope.successMessage = true;
            $timeout(function() {
                $modalInstance.close();
            }, 1000);
        }, function (error) {
            $scope.errorMessage = true;
        });
    };
});
