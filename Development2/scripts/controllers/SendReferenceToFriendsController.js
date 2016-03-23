/**
 * Created by Van on 10.02.2016.
 */
angular.module('Jobsite').controller('SendReferenceToFriendsController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, ReferralService, jobId, jobTitle,resumeId,referenceId,RESOURCES) {
    $scope.WorkingRelationshipTypes = RESOURCES.WORKING_RELATIONSHIP_TYPES;

    $scope.yearsList = [];
    for(var i=1; i <= 20; i++)
    {
        $scope.yearsList.push(i);
    }
    $scope.successMessage='';
    $scope.jobTitle = jobTitle;
    $scope.jobId = jobId;
    $scope.resumeId = resumeId;
    $scope.referenceId = referenceId;

    $scope.message ='';

    $scope.friendsCount ='';

    var _initEmailObjects = function (){
        $scope.emailObjects = [];
        for(var i=0; i < 1; i++)
        {
            $scope.emailObjects.push({
                'email':'',
                'firstName':'',
                'lastName':'',
                'years':'',
                'personTitle': '',
                'workingRelationshipType':''
            });
        }
        ReferralService.getReferenceCountToFriends($scope.jobId, $scope.resumeId, $scope.referenceId).then(function (results) {
            $scope.friendsCount = results.data.content;
        }, function (error) {
            $scope.message ='Error occured!';
            console.log(error.data.message);
        });

    };
    _initEmailObjects();


    $scope.onClose = function() {
        $modalInstance.close();
    };

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
            "jobId": $scope.jobId,
            "resumeId": $scope.resumeId,
            "referenceId": $scope.referenceId,
            "recepients": $scope.emailObjects
        };

        ReferralService.sendReferenceToFriends(postsavedata).then(function (results) {
            _initEmailObjects();
            $scope.successMessage='Successfully sent!';

            $timeout(function() {
                $scope.successMessage='';
            }, 1000);

        }, function (error) {
            $scope.message ='Error occured!';
            console.log(error.data.message);
        });
    };
});
