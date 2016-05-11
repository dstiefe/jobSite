/**
 * Created by Van on 10.02.2016.
 */
//Controller for sending referral
angular.module('Jobsite').controller('SendReferralController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, ReferralService, jobId, jobTitle, referralText) {

    $scope.referralText = referralText;

    $scope.emailObjects = [];
    for (var i = 0; i < 1; i++) {
        $scope.emailObjects.push({
            'email': '',
            'firstName': '',
            'lastName': ''
        });
    }

    $scope.agreeTerm = false;
    $scope.jobTitle = jobTitle;
    $scope.jobId = jobId;

    $scope.message = '';
    $scope.onClose = function () {
        $modalInstance.close();
    };

    $scope.addRecepient = function () {

        if ($scope.emailObjects.length >= 3)
            return;

        $scope.emailObjects.push({
            'email': '',
            'firstName': '',
            'lastName': ''
        });
    };

    $scope.removeRecepient = function (i) {

        if ($scope.emailObjects.length <= 1)
            return;

        $scope.emailObjects.splice(i, 1);

    };
    $scope.onSave = function (isValid) {
        $scope.message = '';
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
            "jobId": $scope.jobId,
            "recepients": $scope.emailObjects
        };
        ReferralService.postReferral(postsavedata).then(function (results) {
            $modalInstance.close();
        }, function (error) {
            $scope.message = 'Error occured!';
            console.log(error.data.message);
        });


    };
});
