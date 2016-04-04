/**
 * Created by Van on 04.04.2016.
 */
angular.module('Jobsite').controller('SendReferralPartialController', function ($scope,  JobsService, ScreeningsService, $sce, $timeout, $document, ReferralService, RESOURCES) {

    $scope.job = {};

    $scope.successMessage='';
    $scope.message ='';
    $scope.yearsList = [];
    for(var i=1; i <= 20; i++)
    {
        $scope.yearsList.push(i);
    }

    var _initEmailObjects = function (){
        $scope.emailObjects = [];
        for(var i=0; i < 1; i++)
        {
            $scope.emailObjects.push({
                'email':'',
                'firstName':'',
                'lastName':'',
                 years:'',
                'personTitle': '',
                'isWorkedTogether': '',
            });
        }
    };

    _initEmailObjects();

    $scope.onSave = function(isValid) {

        $scope.message ='';
        $scope.successMessage='';
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
            "jobId": $scope.job.jobId,
            "recepients": $scope.emailObjects
        };

        ReferralService.postReferral(postsavedata).then(function (results) {
            _initEmailObjects();
            $scope.successMessage='Successfully sent!';

            $timeout(function() {
                $scope.successMessage='';
            }, 1000);

        }, function (error) {
            $scope.message ='Error occured!';
             if (error.data){
                 $scope.message = error.data;
             }
            console.log(error.data.message);
        });
    };
});