/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("CreateScreeningQuestionController", function($scope, Login, $http, $timeout, $location, ScreeningsService, $state, $stateParams, RESOURCES) {

    $scope.id = $stateParams.id;
    $scope.questionsCount = 0;

    $scope.screeningQuestion = {

    };
    $scope.screeningQuestion.tags = [];
    $scope.ScreeningQuestionTypes = RESOURCES.SCREENING_QUESTION_TYPES;
    $scope.screeningQuestion.options =[];
        ScreeningsService.getScreening($scope.id).then(function (results) {
        var res = results.data;
        $scope.questionsCount = res.questionsCount;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.saveChanges = function(isValid) {
        if (!isValid){
            return;
        }

        if ($scope.screeningQuestion.type == 'TrueFalse'){
            $scope.screeningQuestion.options = [];
            $scope.screeningQuestion.answerText = '';
            $scope.screeningQuestion.answerBoolean =  $scope.selectedOption == '0';
        }

        if ($scope.screeningQuestion.type == 'MultipleChoice'){
            $scope.screeningQuestion.answerText = '';
            $scope.screeningQuestion.AnswerOption =  parseInt($scope.selectedOption);
        }

        if ($scope.screeningQuestion.type == 'FillIn'){
            $scope.screeningQuestion.options = [];
        }

            ScreeningsService.postScreeningQuestion($scope.id, $scope.screeningQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('screenings');
                }else{

                    //window.location.reload(true);
                    $scope.questionsCount++;
                    $scope.screeningQuestion = {};
                    $scope.screeningQuestion.options = [];
                    $scope.screeningQuestion.answerText = '';
                    $scope.screeningQuestion.tags = [];
                    $scope.tag = "";
                    $scope.selectedOption='';
                    $scope.screeningQuestion.type='';
                    $scope.option ='';

                }
            }, function (error) {
                console.log(error.data.message);
            });
    }

    $scope.cancel = function() {
        $state.go('screenings');
    }

    $scope.changedQuestionType = function() {
       if ($scope.screeningQuestion.type == 'TrueFalse'){
           $scope.screeningQuestion.options = ['True', 'False'];
           $scope.option ='';
           $scope.selectedOption ='';
       }else{
           $scope.screeningQuestion.options = [];
           $scope.option ='';
           $scope.selectedOption ='';
       }
    };

    $scope.addOption = function() {
        if ($scope.screeningQuestion.options.indexOf($scope.option) == -1) {
            $scope.screeningQuestion.options.push($scope.option);
            $scope.option ='';
        }
    };
    $scope.removeOption = function(index) {
        $scope.options.splice(index - 1, 1);
    };

    $scope.addtags = function() {
        if ($scope.screeningQuestion.tags.indexOf($scope.tag) == -1) {
            $scope.screeningQuestion.tags.push($scope.tag);
            $scope.tag = "";
        }
    };
    $scope.removetag = function(index) {
        $scope.screeningQuestion.tags.splice(index - 1, 1);
    };

});
