/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('MessagesController', function ($scope, $modalInstance, JobsService, $state, InterviewsService, MessagesService, $sce, $timeout, $document, resume, jobId, resumeId, job) {


    $scope.jobId = jobId;
    $scope.resumeId = resumeId;
    $scope.successMessage = false;
    $scope.errorMessage = false;
    $scope.newMessage={
        subject:'',
        body:''
    };

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

    $scope.onClose = function() {
        console.log('close');
        $modalInstance.close();
    };

    MessagesService.getMessages($scope.jobId, $scope.resumeId).then(function (results) {
        $scope.messages = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.send = function(isValid) {
        $scope.successMessage = false;
        $scope.errorMessage = false;
        if (!isValid){
            return
        }

        console.log('send');

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
            $scope.errorMessage = true;
            console.log(error.data.message);
        });
    };

    $scope.cancel = function() {
        console.log('cancel');
        $modalInstance.close();
    };

});