/**
 * Created by Van on 03.02.2016.
 */
//Controller for creating referral question
angular.module('Jobsite').controller("CreateReferralQuestionController", function($scope,  $http, $timeout, $location, ReferralService, $state, $stateParams, RESOURCES) {

    $scope.id = $stateParams.id;
    $scope.type = $stateParams.type;

    $scope.questionsCount = 0;
    $scope.questionId = $stateParams.questionId;
    $scope.mode= 'create';
    if (!angular.isUndefined($scope.questionId) && $scope.questionId != ''){
        $scope.mode= 'edit';
    }

    $scope.referralQuestion = {

    };
    $scope.referralQuestion.tags = [];
    $scope.ScreeningQuestionTypes = RESOURCES.REFERENCES_QUESTION_TYPES;
    $scope.referralQuestion.options =[];
    $scope.referralQuestion.optionsDescriptions = {};
    $scope.numOptionsLikertScale =[3,5,7,9];
    $scope.numOptionsSelected = '';

    ReferralService.getJobReferral($scope.id).then(function (results) {
        var res = results.data;
        $scope.questionsCount = res.questionsCount;
    }, function (error) {
        console.log(error.data.message);
    });

    if ($scope.mode == 'edit') {
        ReferralService.getReferralQuestionById($scope.id, $scope.questionId).then(function (results) {
            $scope.referralQuestion = results.data;

            if ( angular.isUndefined($scope.referralQuestion.tags) || $scope.referralQuestion.tags == null ){
                $scope.referralQuestion.tags = [];
            }

            if ($scope.referralQuestion.type == 'LikertScale'){
                $scope.numOptionsSelected = $scope.referralQuestion.options.length;
            }

        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function(isValid) {
        if (!isValid){
            return;
        }

        if ($scope.referralQuestion.type == 'TrueFalse'){
            $scope.referralQuestion.options = [];
            $scope.referralQuestion.answerText = '';

        }

        if ($scope.referralQuestion.type == 'MultipleChoice'){
            $scope.referralQuestion.answerText = '';
        }

        if ($scope.referralQuestion.type == 'FillIn'){
            $scope.referralQuestion.options = [];
        }
        if ($scope.mode == 'edit') {

            ReferralService.putReferralQuestion($scope.id, $scope.questionId, $scope.referralQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('editreferral', {'id': $scope.id});
                }else{

                    //window.location.reload(true);
                    $scope.questionsCount++;
                    $scope.referralQuestion = {};
                    $scope.referralQuestion.options = [];
                    $scope.referralQuestion.answerText = '';
                    $scope.referralQuestion.tags = [];
                    $scope.tag = "";
                    $scope.referralQuestion.type='';
                    $scope.option ='';

                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else {
            ReferralService.postReferralQuestion($scope.id, $scope.referralQuestion).then(function (results) {
                if ($scope.saveAndExit){
                    if ($scope.type =='editreferral'){
                        $state.go('editreferral', {'id': $scope.id});
                    }else{
                        $state.go('referrals');
                    }
                }else{

                    //window.location.reload(true);
                    $scope.questionsCount++;
                    $scope.referralQuestion = {};
                    $scope.referralQuestion.options = [];
                    $scope.referralQuestion.answerText = '';
                    $scope.referralQuestion.tags = [];
                    $scope.tag = "";
                    $scope.referralQuestion.type='';
                    $scope.option ='';

                }
            }, function (error) {
                console.log(error.data.message);
            });
        }

    }

    $scope.cancel = function() {
        $state.go('referrals');
    }

    $scope.changedQuestionType = function() {
       if ($scope.referralQuestion.type == 'TrueFalse'){
           $scope.referralQuestion.options = ['True', 'False'];
           $scope.option ='';
           $scope.referralQuestion.optionsDescriptions ={};
       }else if ($scope.referralQuestion.type == 'LikertScale'){

           $scope.referralQuestion.options = [];
           $scope.option ='';
           $scope.referralQuestion.optionsDescriptions ={};
       }else{
           $scope.referralQuestion.options = [];
           $scope.option ='';
           $scope.referralQuestion.optionsDescriptions ={};
       }
    };

    $scope.addOption = function() {
        if ($scope.referralQuestion.options.indexOf($scope.option) == -1) {
            $scope.referralQuestion.options.push($scope.option);
            $scope.option ='';
        }
    };
    $scope.removeOption = function(index) {
        $scope.options.splice(index - 1, 1);
    };

    $scope.addtags = function() {
        if ($scope.referralQuestion.tags.indexOf($scope.tag) == -1) {
            $scope.referralQuestion.tags.push($scope.tag);
            $scope.tag = "";
        }
    };
    $scope.removetag = function(index) {
        $scope.referralQuestion.tags.splice(index - 1, 1);
    };

    $scope.changedNumOptionsLikertScale = function() {
        $scope.referralQuestion.options = [];
        $scope.referralQuestion.optionsDescriptions ={};

        if ($scope.numOptionsSelected && parseInt($scope.numOptionsSelected) >=3 ){
            for(var i=1;i<=parseInt($scope.numOptionsSelected) ;i++){

                $scope.referralQuestion.options.push(i);
                $scope.referralQuestion.optionsDescriptions[i]='';
            }
        }
    };

});
