/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("CreateScreeningQuestionController", function($scope,  $http, $timeout, $location, ScreeningsService, $state, $stateParams, RESOURCES) {

    $scope.id = $stateParams.id;
    $scope.type = $stateParams.type;

    $scope.questionId = $stateParams.questionId;
    $scope.mode= 'create';
    if (!angular.isUndefined($scope.questionId) && $scope.questionId != ''){
        $scope.mode= 'edit';
    }

    $scope.questionsCount = 0;

    $scope.screeningQuestion = {

    };
    $scope.screeningQuestion.tags = [];
    $scope.ScreeningQuestionTypes = RESOURCES.SCREENING_QUESTION_TYPES;
    $scope.screeningQuestion.options =[];
    $scope.screeningQuestion.optionsDescriptions = {};
    $scope.numOptionsLikertScale =[3,5,7,9];
    $scope.numOptionsSelected = '';

    $scope.screeningTags = [];

    ScreeningsService.getScreening($scope.id).then(function (results) {
        var res = results.data;

        $scope.screeningTags = res.tags;
        if ($scope.screeningTags == null){
            $scope.screeningTags = [];
        }

        $scope.questionsCount = res.questionsCount;

    }, function (error) {
        console.log(error.data.message);
    });


    if ($scope.mode == 'edit') {
        ScreeningsService.getScreeningQuestionById($scope.id, $scope.questionId).then(function (results) {
            $scope.screeningQuestion = results.data;

            if ( angular.isUndefined($scope.screeningQuestion.tags) || $scope.screeningQuestion.tags == null ){
                $scope.screeningQuestion.tags = [];
            }

            if ($scope.screeningQuestion.type == 'TrueFalse'){
                $scope.screeningQuestion.options = ['True', 'False'];
                $scope.selectedOption = ($scope.screeningQuestion.answerBoolean) ? '0' :'1' ;
            }

            if ($scope.screeningQuestion.type == 'LikertScale'){
                $scope.numOptionsSelected = $scope.screeningQuestion.options.length;
            }
            if ($scope.screeningQuestion.type == 'MultipleChoice'){
                $scope.selectedOption = $scope.screeningQuestion.answerOption.toString();
            }

        }, function (error) {
            console.log(error.data.message);
        });
    }

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
            $scope.screeningQuestion.answerOption =  parseInt($scope.selectedOption);
        }

        if ($scope.screeningQuestion.type == 'FillIn'){
            $scope.screeningQuestion.options = [];
        }

        if ($scope.mode == 'edit') {

            ScreeningsService.putScreeningQuestion($scope.id, $scope.questionId, $scope.screeningQuestion).then(function (results) {
                if ($scope.saveAndExit){
                        $state.go('editscreening', {'id': $scope.id});
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
        else{
            ScreeningsService.postScreeningQuestion($scope.id, $scope.screeningQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    if ($scope.type =='editscreening'){
                        $state.go('editscreening', {'id': $scope.id});
                    }else{
                        $state.go('screenings');
                    }
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
    };

    $scope.cancel = function() {
        if ($scope.type =='editscreening'){
            $state.go('editscreening', {'id': $scope.id});
        }else{
            $state.go('screenings');
        }
    };

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
    $scope.$back = function() {
        window.history.back();
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
