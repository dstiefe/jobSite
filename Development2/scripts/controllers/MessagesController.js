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
    for (var i =0; i< 3;i++){
        $scope.messages.push({
            from:'Dyatal '+ i,
            to:'Me '+ i,
            subject:'test'+i,
            body:'bodytest'+i,
            date: 1460232379
        });
    }

    $scope.send = function() {
       console.log('send');
    };

    $scope.cancel = function() {
        console.log('cancel');
        $modalInstance.close();
    };

});