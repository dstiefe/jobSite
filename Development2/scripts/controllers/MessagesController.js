/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('MessagesController', function ($scope, $modalInstance, JobsService, $state, InterviewsService, MessagesService, AuthService, $sce, $timeout, $document, resume, jobId, resumeId, job) {

    $scope.jobId = jobId;
    $scope.resumeId = resumeId;
    $scope.successMessage = false;
    $scope.errorMessage = '';
    $scope.newMessage={
        subject:'',
        body:''
    };
    $scope.selectedMessageTemplate = {};
    $scope.isSaveTemplate = false;
    $scope.nameTemplate = '';
    $scope.isAdmin = AuthService.authentication.isAdministrator;


    if (resume != null){
        $scope.toUserName = resume.firstName + ' ' + resume.lastName;
    }
    else{
        $scope.toUserName = 'Emplorer';
    }

    if (job != null){
        $scope.job = job;
    }
    else{
        JobsService.getJob($scope.jobId).then(function (results) {
            response = results.data;
            $scope.job = response;
        }, function (error) {
            console.log(error.data.message);
        });
    }

    MessagesService.getMessages($scope.jobId, $scope.resumeId).then(function (results) {
        $scope.messages = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    MessagesService.getMessageTemplates().then(function (results) {
        $scope.messageTemplates = results.data;
    }, function (error) {
        console.log(error.data.message);
    });


    var _sendMessage = function(){

        var request ={
            jobId: $scope.jobId,
            resumeId: $scope.resumeId,
            subject:$scope.newMessage.subject,
            body:$scope.newMessage.body
        };
        MessagesService.sendMessage(request).then(function (results) {
            var message = results.data;
            $scope.messages.push(message);

            $scope.successMessage = true;
            $scope.newMessage.subject ='';
            $scope.newMessage.body ='';
            $timeout(function() {
                $scope.successMessage =false;
            }, 1000);

        }, function (error) {
            $scope.errorMessage = "Try again";
            console.log(error.data.message);
        });

    };

    $scope.send = function(isValid) {
        $scope.successMessage = false;
        $scope.errorMessage = '';
        if (!isValid){
            $scope.errorMessage = "You don't fill mandatory fields";
            return;
        }

        if ($scope.isSaveTemplate && !$scope.nameTemplate){
            $scope.errorMessage = "You don't fill Name Template";
            return;
        }

        console.log('send');

        if ($scope.isSaveTemplate){
            var requestTemp ={
                name: $scope.nameTemplate,
                subject:$scope.newMessage.subject,
                body:$scope.newMessage.body
            };
            MessagesService.postMessageTemplate(requestTemp).then(function (results) {
                var messageTemplate = results.data;
                $scope.messageTemplates.push(messageTemplate);
                _sendMessage();

            }, function (error) {
                $scope.errorMessage = "Can not save template";
                console.log(error.data.message);
            });
        }
        else{
            _sendMessage();
        }
    };

    $scope.cancel = function() {
        console.log('cancel');
        $modalInstance.close();
    };

    $scope.onClose = function() {
        console.log('close');
        $modalInstance.close();
    };

    $scope.messageTemplateChanged = function(messageTemplate) {
       if ($scope.selectedMessageTemplate){
          $scope.newMessage.subject = $scope.selectedMessageTemplate.subject;
          $scope.newMessage.body = $scope.selectedMessageTemplate.body;
       }else{
           $scope.newMessage.subject = '';
           $scope.newMessage.body = '';
       }
    };
});