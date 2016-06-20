/**
 * Created by Van on 10.02.2016.
 */
//Controller for sending reference to friends
angular.module('Jobsite').controller('SendReferenceToFriendsController', function ($scope, JobsService, ScreeningsService, $sce, $timeout, $document, ReferralService, RESOURCES) {

    $scope.job = {};
    $scope.referenceId = '';
    $scope.reference = {};
    $scope.WorkingRelationshipTypes = RESOURCES.WORKING_RELATIONSHIP_TYPES;

    $scope.yearsList = [];
    for (var i = 1; i <= 20; i++) {
        $scope.yearsList.push(i);
    }

    $scope.successMessage = '';
    $scope.message = '';
    $scope.friendsCount = '';

    var _initEmailObjects = function () {
        $scope.emailObjects = [];
        for (var i = 0; i < 1; i++) {
            $scope.emailObjects.push({
                'email': '',
                'firstName': '',
                'lastName': '',
                'years': '',
                'personTitle': '',
                'workingRelationshipType': ''
            });
        }
        ReferralService.getReferenceCountToFriends($scope.job.id, $scope.job.resumeId, $scope.referenceId).then(function (results) {
            $scope.friendsCount = results.data.content;
            $scope.reference.isNew = $scope.friendsCount == 0;
        }, function (error) {
            $scope.message = 'Error occured!';
            console.log(error.data.message);
        });

    };


    //$scope.onClose = function() {
    //    $modalInstance.close();
    //};

    $scope.sendReferenceToFriends = function (reference) {
        $scope.successMessage = '';
        $scope.message = '';
        $scope.friendsCount = '';
        $scope.referenceId = reference.id;
        $scope.reference = reference;
        _initEmailObjects();
    };

    $scope.onSave = function (isValid) {

        $scope.message = '';
        $scope.successMessage = '';
        if (!isValid) {
            $scope.message = 'Check input data!';
            return;
        }

        var isFill = false;

        for (var i = 0; i < $scope.emailObjects.length; i++) {
            var emailObject = $scope.emailObjects[i];
            if (!angular.isUndefined(emailObject.email) && emailObject.email != null && emailObject.email != '') {
                isFill = true;
            }
        }

        if (!isFill) {
            $scope.message = 'You do not fill emails!';
            return;
        }

        var postsavedata = {
            "jobId": $scope.job.id,
            "resumeId": $scope.job.resumeId,
            "referenceId": $scope.referenceId,
            "recepients": $scope.emailObjects
        };

        ReferralService.sendReferenceToFriends(postsavedata).then(function (results) {
            _initEmailObjects();
            $scope.successMessage = 'Successfully sent!';

            $timeout(function () {
                $scope.successMessage = '';
            }, 1000);

        }, function (error) {
            $scope.message = 'Error occured!';
            console.log(error.data.message);
        });
    };
});
