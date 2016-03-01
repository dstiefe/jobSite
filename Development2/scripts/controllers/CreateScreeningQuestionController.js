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
    $scope.screeningQuestion.optionsDescriptions = {};
    $scope.numOptionsLikertScale =[3,5,7,9];
    $scope.numOptionsSelected = '';
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
           $scope.screeningQuestion.optionsDescriptions ={};
       }else if ($scope.screeningQuestion.type == 'LikertScale'){

           $scope.screeningQuestion.options = [];
           $scope.option ='';
           $scope.selectedOption ='';
           $scope.screeningQuestion.optionsDescriptions ={};
       }else{
           $scope.screeningQuestion.options = [];
           $scope.option ='';
           $scope.selectedOption ='';
           $scope.screeningQuestion.optionsDescriptions ={};
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

    $scope.changedNumOptionsLikertScale = function() {
        $scope.screeningQuestion.options = [];
        $scope.screeningQuestion.optionsDescriptions ={};

        if ($scope.numOptionsSelected && parseInt($scope.numOptionsSelected) >=3 ){
            for(var i=1;i<=parseInt($scope.numOptionsSelected) ;i++){

                $scope.screeningQuestion.options.push(i);
                $scope.screeningQuestion.optionsDescriptions[i]='';
            }
        }
    };

});
