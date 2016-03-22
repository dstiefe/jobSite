/**
 * Created by Van on 22.03.2016.
 */
angular.module('Jobsite').controller("TraitifyController", function($scope, $rootScope, Login, $http, $timeout, $location,  $state, $stateParams, RESOURCES) {


    $scope.jobId = $stateParams.jobId;
    $scope.resumeId = $stateParams.resumeId;
    $scope.traitifyId = $stateParams.traitifyId;

    Traitify.setPublicKey("m8rrmi54uig26dapmnv6bstak9"); // Example Public Key
    Traitify.setHost("api-sandbox.traitify.com"); // Example host url (Defaults to api.traitify.com)
    Traitify.setVersion("v1"); // Example Version
    var assessmentId = $scope.traitifyId; // Example Assessment id

    //traitify = Traitify.ui.load(assessmentId, ".slide-deck", {
    //    results: {target: ".results"},
    //    personalityTypes: {target: ".personality-types"},
    //    personalityTraits: {target: ".personality-traits"}
    //}); // Example selector for widget target


    traitify = Traitify.ui.load("results", assessmentId, ".traitify-widget"); // Example selector for widget target
    traitify.onInitialize(function(){
        console.log(traitify.data.get("PersonalityTypes"));
        console.log("Initialized");
    })
    traitify = Traitify.ui.load("personalityTypes", assessmentId, ".traitify-widget"); // Example selector for widget target
    traitify.onInitialize(function(){
        console.log(traitify.data.get("PersonalityTypes"));
        console.log("Initialized!");
    })



});