/**
 * Created by Van on 03.02.2016.
 */
//Controller for creating interview question
angular.module('Jobsite').controller("CreateInterviewQuestionController", function($scope,  $http, $timeout, $location, InterviewsService, $state, $stateParams, RESOURCES) {

    $scope.id = $stateParams.id;
    $scope.type = $stateParams.type;

    $scope.questionsCount = 0;
    $scope.questionId = $stateParams.questionId;
    $scope.mode= 'create';
    if (!angular.isUndefined($scope.questionId) && $scope.questionId != ''){
        $scope.mode= 'edit';
    }

    $scope.interviewQuestion = {

    };
    $scope.interviewQuestion.tags = [];
    $scope.ScreeningQuestionTypes = RESOURCES.SCREENING_QUESTION_TYPES;
    $scope.interviewQuestion.options =[];
    $scope.interviewQuestion.optionsDescriptions = {};
    $scope.numOptionsLikertScale =[3,5,7,9];
    $scope.numOptionsSelected = '';






    InterviewsService.getInterview($scope.id).then(function (results) {
        var res = results.data;
        $scope.questionsCount = res.questionsCount;
    }, function (error) {
        console.log(error.data.message);
    });

    if ($scope.mode == 'edit') {
        InterviewsService.getInterviewQuestionById($scope.id, $scope.questionId).then(function (results) {
            $scope.interviewQuestion = results.data;

            if ( angular.isUndefined($scope.interviewQuestion.tags) || $scope.interviewQuestion.tags == null ){
                $scope.interviewQuestion.tags = [];
            }

            if ($scope.interviewQuestion.type == 'LikertScale'){
                $scope.numOptionsSelected = $scope.interviewQuestion.options.length;
            }

        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function(isValid) {
        if (!isValid){
            return;
        }

        if ($scope.interviewQuestion.type == 'TrueFalse'){
            $scope.interviewQuestion.options = [];
            $scope.interviewQuestion.answerText = '';

        }

        if ($scope.interviewQuestion.type == 'MultipleChoice'){
            $scope.interviewQuestion.answerText = '';
        }

        if ($scope.interviewQuestion.type == 'FillIn'){
            $scope.interviewQuestion.options = [];
        }
        if ($scope.mode == 'edit') {

            InterviewsService.putInterviewQuestion($scope.id, $scope.questionId, $scope.interviewQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('editinterview', {'id': $scope.id});
                }else{

                    //window.location.reload(true);
                    $scope.questionsCount++;
                    $scope.interviewQuestion = {};
                    $scope.interviewQuestion.options = [];
                    $scope.interviewQuestion.answerText = '';
                    $scope.interviewQuestion.tags = [];
                    $scope.tag = "";
                    $scope.interviewQuestion.type='';
                    $scope.option ='';

                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else {
            InterviewsService.postInterviewQuestion($scope.id, $scope.interviewQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    if ($scope.type =='editinterview'){
                        $state.go('editinterview', {'id': $scope.id});
                    }else{
                        $state.go('interviews');
                    }
                }else{

                    //window.location.reload(true);
                    $scope.questionsCount++;
                    $scope.interviewQuestion = {};
                    $scope.interviewQuestion.options = [];
                    $scope.interviewQuestion.answerText = '';
                    $scope.interviewQuestion.tags = [];
                    $scope.tag = "";
                    $scope.interviewQuestion.type='';
                    $scope.option ='';

                }
            }, function (error) {
                console.log(error.data.message);
            });
        }

    }

    $scope.cancel = function() {
        $state.go('interviews');
    }

    $scope.changedQuestionType = function() {
       if ($scope.interviewQuestion.type == 'TrueFalse'){
           $scope.interviewQuestion.options = ['True', 'False'];
           $scope.option ='';
           $scope.interviewQuestion.optionsDescriptions ={};
       }else if ($scope.interviewQuestion.type == 'LikertScale'){

           $scope.interviewQuestion.options = [];
           $scope.option ='';
           $scope.interviewQuestion.optionsDescriptions ={};
       }else{
           $scope.interviewQuestion.options = [];
           $scope.option ='';
           $scope.interviewQuestion.optionsDescriptions ={};
       }
    };

    $scope.addOption = function() {
        if ($scope.interviewQuestion.options.indexOf($scope.option) == -1) {
            $scope.interviewQuestion.options.push($scope.option);
            $scope.option ='';
        }
    };
    $scope.removeOption = function(index) {
        $scope.options.splice(index - 1, 1);
    };

    $scope.addtags = function() {
        if ($scope.interviewQuestion.tags.indexOf($scope.tag) == -1) {
            $scope.interviewQuestion.tags.push($scope.tag);
            $scope.tag = "";
        }
    };
    $scope.removetag = function(index) {
        $scope.interviewQuestion.tags.splice(index - 1, 1);
    };

    $scope.changedNumOptionsLikertScale = function() {
        $scope.interviewQuestion.options = [];
        $scope.interviewQuestion.optionsDescriptions ={};

        if ($scope.numOptionsSelected && parseInt($scope.numOptionsSelected) >=3 ){
            for(var i=1;i<=parseInt($scope.numOptionsSelected) ;i++){

                $scope.interviewQuestion.options.push(i);
                $scope.interviewQuestion.optionsDescriptions[i]='';
            }
        }
    };
    $scope.$back = function() {
        window.history.back();
    };
});
