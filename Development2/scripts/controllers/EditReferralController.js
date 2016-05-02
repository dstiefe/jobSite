/**
 * Created by Van on 04.03.2016.
 */
/**
 * Created by Van on 03.02.2016.
 */
//Controller for editing referral
angular.module('Jobsite').controller("EditReferralController", function($scope,  $http, $timeout, $location, ReferralService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.currentPage = 1;
    $scope.entryLimit = 10;

    ReferralService.getJobReferral($scope.id).then(function (results) {
        $scope.referral = results.data
    }, function (error) {
        console.log(error.data.message);
    });

    var _getReferralQuestions =  function() {
        ReferralService.getReferralQuestionsByJobReferralId($scope.id).then(function (results) {
            $scope.referralQuestions = results.data;

            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.referralQuestions.length; //Initially for no filter
            $scope.totalItems = $scope.referralQuestions.length;

        }, function (error) {
            console.log(error.data.message);
        });
    };

    _getReferralQuestions();

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    $scope.deleterecords = function(data) {
        ReferralService.deleteReferralQuestion(data.jobReferralId, data.id).then(function (results) {
            _getReferralQuestions();
        }, function (error) {
            console.log(error.data.message);
        });
    };
});