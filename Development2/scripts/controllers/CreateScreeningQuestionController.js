/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("CreateScreeningQuestionController", function($scope, Login, $http, $timeout, $location, ScreeningsService, $state, $stateParams, RESOURCES) {

    $scope.id = $stateParams.id;
    $scope.questionsCount = 0;
    $scope.screeningQuestion = {

    };
    $scope.ScreeningQuestionTypes = RESOURCES.SCREENING_QUESTION_TYPES;
    $scope.options =[];
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
            $scope.screeningQuestion.answerBoolean =  $scope.selectedOption == '0';
        }

            ScreeningsService.postScreeningQuestion($scope.id, $scope.screeningQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('screenings');
                }else{
                    $state.go('createscreeningquestion', {'id': $scope.id});
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
});
