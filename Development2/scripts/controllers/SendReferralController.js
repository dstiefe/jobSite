/**
 * Created by Van on 10.02.2016.
 */
angular.module('Jobsite').controller('SendReferralController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, ReferralService, jobId, jobTitle) {


    $scope.emailObjects = [];
    for(var i=0; i < 3; i++)
    {
        $scope.emailObjects.push({
            'email':'',
            'firstName':'',
            'lastName':''
        });
    }

    $scope.agreeTerm = false;
    $scope.jobTitle = jobTitle;
    $scope.jobId = jobId;

    $scope.message ='';
    $scope.onClose = function() {
        $modalInstance.close();
    };

    $scope.onSave = function() {
        $scope.message ='';
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
            "recepients": $scope.emailObjects
        };
        ReferralService.postReferral(postsavedata).then(function (results) {
            $modalInstance.close();
        }, function (error) {
            $scope.message ='Error occured!';
            console.log(error.data.message);
        });


    };
});
