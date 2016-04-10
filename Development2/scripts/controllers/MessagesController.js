/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('MessagesController', function ($scope, $modalInstance, JobsService, $state, InterviewsService, $sce, $timeout, $document, resume, jobId) {

    $scope.resume = resume;
    $scope.jobId = jobId;

    $scope.successMessage =false;
    $scope.errorMessage =false;
    $scope.newMessage={
        subject:'',
        body:''
    };

    JobsService.getJob($scope.jobId).then(function (results) {
        response = results.data;
        $scope.job = response;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.onClose = function() {
        $modalInstance.close();
    };


    $scope.messages = [];
    for (var i =0; i< 50;i++){
        $scope.messages.push({
            from:'Dyatal ewrewrewrewrewrwerwer'+ i,
            to:'Me werwrewrewrewrtertretyrytrytr '+ i,
            subject:'test tretytrytrytrytry gretyry trytrytry htrytry ggfgfdgfd trytrytry ytrytr ghttrhtr htrhthtrh hthtrbtt y yu yyy '+i,
            body:'bodytest ergre gregreg gtrhh  htrhhet htrhtreh hrthythyt hytjytjyt hjytjytjyt hjytjytjyt htyjytjyjuykuykiu hjytjytj jytjyt jyuuykuykuykiu juykuykuykyu '+i,
            date: 1460232379
        });
    }

    $scope.send = function(isValid) {
        $scope.successMessage = false;
        $scope.errorMessage = false;
        if (!isValid){
            return
        }

        console.log('send');

        $scope.messages.push({
            from:'Dyatal ewrewrewrewrewrwerwer'+ i,
            to:'Me werwrewrewrewrtertretyrytrytr '+ i,
            subject:$scope.newMessage.subject,
            body:$scope.newMessage.body,
            date: 1460232379
        });



        $scope.successMessage =true;
        $scope.newMessage.subject ='';
        $scope.newMessage.body ='';
        $timeout(function() {
            $scope.successMessage =false;
        }, 1000);
    };

    $scope.cancel = function() {
        console.log('cancel');
        $modalInstance.close();
    };

});