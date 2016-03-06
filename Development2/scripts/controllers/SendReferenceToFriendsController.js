/**
 * Created by Van on 10.02.2016.
 */
angular.module('Jobsite').controller('SendReferenceToFriendsController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, ReferralService, jobId, jobTitle,resumeId,referenceId) {

    $scope.emailObjects = [];

    for(var i=0; i < 1; i++)
    {
        $scope.emailObjects.push({
            'email':'',
            'firstName':'',
            'lastName':''
        });
    }

    $scope.jobTitle = jobTitle;
    $scope.jobId = jobId;
    $scope.resumeId = resumeId;
    $scope.referenceId = referenceId;

    $scope.message ='';
    $scope.onClose = function() {
        $modalInstance.close();
    };
    $scope.addReference= function() {

        if ($scope.emailObjects.length>=3)
            return;

        $scope.emailObjects.push({
            'email':'',
            'firstName':'',
            'lastName':''
        });
    };
    $scope.removeReference= function(i) {

        if ($scope.emailObjects.length<=1)
            return;

        $scope.emailObjects.splice(i, 1);

    };
    $scope.onSave = function(isValid) {

        $scope.message ='';

        if (!isValid){
            $scope.message ='Check input data!';
            return;
        }

        var isFill = false;

        for(var i = 0; i < $scope.emailObjects.length; i++)
        {
            var emailObject = $scope.emailObjects[i];
            if (!angular.isUndefined(emailObject.email) && emailObject.email != null && emailObject.email != '')
            {
                isFill  = true;
            }
        }

        if (!isFill)
        {
            $scope.message ='You do not fill emails!';
            return;
        }

        var postsavedata = {
            "jobId": $scope.jobId,
            "resumeId": $scope.resumeId,
            "referenceId": $scope.referenceId,
            "recepients": $scope.emailObjects
        };

        ReferralService.sendReferenceToFriends(postsavedata).then(function (results) {
            $modalInstance.close();
        }, function (error) {
            $scope.message ='Error occured!';
            console.log(error.data.message);
        });
    };
});
