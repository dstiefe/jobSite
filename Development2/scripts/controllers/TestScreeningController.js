/**
 * Created by Van on 04.02.2016.
 */

angular.module('Jobsite').controller("TestScreeningController", function($scope, $rootScope,  $http, $timeout, $location, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {

    var timeStarted = false;
    var _startTimer = function (){
        if (!timeStarted) {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            timeStarted = true
        } else if ((timeStarted) && (!$scope.timerRunning)) {
            $scope.$broadcast('timer-resume');
            $scope.timerRunning = true;
        }
    }

    var _stopTimer = function() {
        if ((timeStarted) && ($scope.timerRunning)) {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        }
    }

    _startTimer();

//http://stackoverflow.com/questions/26950645/how-to-get-current-time-from-angular-timer
    $scope.$on('timer-tick', function (event, data) {
        if ($scope.timerRunning === true) {
            $scope.millis = data.millis;
        }
    });
    var timeseconds0 = 0;


    $scope.resumeId = $stateParams.id;
    $scope.screeningId = $stateParams.screeningId;
    $scope.jobId = $stateParams.jobId;
    $scope.currentQuestionNumber = 0;
    $scope.screening = {};
    $scope.screeningQuestion = {};
    $scope.resultQuestion = {};

    ScreeningsService.getScreeningByResumeId($scope.jobId, $scope.resumeId, $scope.screeningId).then(function (results) {
        $scope.screening  = results.data;
        _getQuestion();
    }, function (error) {
        console.log(error.data.message);
    });

    var _getQuestion = function(){
        $scope.currentQuestionNumber++;
        ScreeningsService.getScreeningQuestionByResumeId($scope.jobId, $scope.resumeId, $scope.screeningId, $scope.currentQuestionNumber).then(function (results) {
            $scope.screeningQuestion  = results.data;

        }, function (error) {
            console.log(error.data.message);
        });
    }



    $scope.saveChanges = function(isValid) {

        if (!isValid){
            return;
        }
        _stopTimer();

        if ($scope.screeningQuestion.type == 'TrueFalse'){

            $scope.resultQuestion.answerText = '';
            $scope.resultQuestion.answerOption = 0;
            $scope.resultQuestion.answerBoolean =  $scope.resultQuestion.answerBoolean == 'true';
        }

        if ($scope.screeningQuestion.type == 'MultipleChoice'){

            $scope.resultQuestion.answerText = '';
            $scope.resultQuestion.answerBoolean = false;
            $scope.resultQuestion.answerOption =  parseInt($scope.resultQuestion.answerOption);
        }

        if ($scope.screeningQuestion.type == 'FillIn'){

            $scope.resultQuestion.answerOption = 0;
            $scope.resultQuestion.answerBoolean = false;

        }

        var timeseconds1 =  $scope.millis / 1000;

        $scope.resultQuestion.timeToComplete = timeseconds1 - timeseconds0;

        timeseconds0 = timeseconds1;

        ScreeningsService.setResultOnScreeningQuestion($scope.jobId, $scope.resumeId, $scope.screeningId, $scope.screeningQuestion.id, $scope.resultQuestion ).then(function (results) {
            if ($scope.saveAndExit){
                $state.go('finishtestscreening');
            }else{
                $scope.resultQuestion = {};
                _getQuestion();
                _startTimer();
            }
        }, function (error) {
            console.log(error.data.message);
            _startTimer();
        });
    }

});
