/**
 * Created by Van on 22.03.2016.
 */
angular.module('Jobsite').controller("TraitifyController", function($scope, $rootScope,  $http, $timeout, $location,  $state, TraitifyService, $stateParams, RESOURCES) {


    $scope.jobId = $stateParams.jobId;
    $scope.resumeId = $stateParams.resumeId;
    $scope.traitifyId = $stateParams.traitifyId;

    Traitify.setPublicKey(RESOURCES.TRAITIFY_PUBLIC_KEY); // Example Public Key
    Traitify.setHost(RESOURCES.TRAITIFY_HOST); // Example host url (Defaults to api.traitify.com)
    Traitify.setVersion(RESOURCES.TRAITIFY_VERSION); // Example Version


    traitify = Traitify.ui.load($scope.traitifyId, ".slide-deck", {
        slideDeck: {showResults: false},
        results: {target: ".results"},
        personalityTypes: {target: ".personality-types"},
        personalityTraits: {target: ".personality-traits"}
    }); // Example selector for widget target

    traitify.slideDeck.onFinished(function(){
        TraitifyService.finishTraitify($scope.jobId, $scope.resumeId, $scope.traitifyId).then(function (results) {
            $state.go('traitifyfinish', {'resumeId': $scope.resumeId, 'traitifyId': $scope.traitifyId, 'jobId':$scope.jobId});
        }, function (error) {
            console.log(error.data.message);
        });
    });

    //traitify = Traitify.ui.load("results", assessmentId, ".traitify-widget"); // Example selector for widget target
    //traitify.onInitialize(function(){
    //    console.log(traitify.data.get("PersonalityTypes"));
    //    console.log("Initialized");
    //})
    //traitify = Traitify.ui.load("personalityTypes", assessmentId, ".traitify-widget"); // Example selector for widget target
    //traitify.onInitialize(function(){
    //    console.log(traitify.data.get("PersonalityTypes"));
    //    console.log("Initialized!");
    //})
    //


});