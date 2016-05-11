/**
 * Created by Van on 04.02.2016.
 */
//Controller for testing reference
angular.module('Jobsite').controller("TestJobReferralController", function ($scope, $rootScope, $http, $timeout, $location, ReferralService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.jobId = $stateParams.jobId;
    $scope.resumeId = $stateParams.resumeId;
    $scope.jobReferralId = $stateParams.jobReferralId;
    $scope.successMessage = '';
    $scope.errorMessage = '';

    $scope.reference = {};
    $scope.referenceQuestions = {};
    $scope.resultQuestions = [];

    $scope.currentIndexQuestion = 0;
    $scope.question = {};
    $scope.state = '';

    $scope.slider = {
        value: 50,
        options: {
            floor: 0,
            ceil: 100
        }
    };

    var _setQuestion = function () {
        $scope.question = $scope.referenceQuestions[$scope.currentIndexQuestion];
    };

    var _nextQuestion = function () {
        if ($scope.referenceQuestions.length > ($scope.currentIndexQuestion + 1))
            $scope.currentIndexQuestion++;
        _setQuestion();
    };
    var _previousQuestion = function () {
        if ($scope.currentIndexQuestion - 1 >= 0)
            $scope.currentIndexQuestion--;
        _setQuestion();
    };

    ReferralService.getReferenceByResumeId($scope.jobId, $scope.resumeId, $scope.jobReferralId).then(function (results) {
        $scope.reference = results.data;
        ReferralService.getReferenceQuestions($scope.jobId, $scope.resumeId, $scope.jobReferralId).then(function (results) {
            $scope.referenceQuestions = results.data;
            _setQuestion();
        }, function (error) {
            console.log(error.data.message);
        });
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.saveChanges = function (isValid) {
        $scope.successMessage = '';

        if (!isValid) {
            $scope.errorMessage = 'Please fill out all mandatory fields!';
            return;
        }
        $scope.errorMessage = '';

        if ($scope.state == 'next') {
            _nextQuestion();
        }

        if ($scope.state == 'previous') {
            _previousQuestion();
        }

        if ($scope.state == 'save') {
            var data = {'results': $scope.resultQuestions};
            ReferralService.setAnswersOnReferenceQuestions($scope.jobId, $scope.resumeId, $scope.jobReferralId, data).then(function (results) {
                $scope.successMessage = 'Successfully saved!';

                $timeout(function () {
                    $state.go('finishestsjobreferral', {
                        jobId: $scope.jobId,
                        resumeId: $scope.resumeId,
                        jobReferralId: $scope.jobReferralId
                    });
                }, 1000);

            }, function (error) {
                $scope.errorMessage = 'Error occured';
                console.log(error.data.message);
            });
        }

        $scope.state = '';
    }
});