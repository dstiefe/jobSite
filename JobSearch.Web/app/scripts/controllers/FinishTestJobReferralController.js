/**
 * Created by Van on 28.04.2016.
 */
angular.module('Jobsite').controller("FinishTestJobReferralController", function ($scope, $http, $timeout, $location, ReferralService, CategoriesService, ResumesService, $state, $stateParams) {

    $scope.jobId = $stateParams.jobId;
    $scope.resumeId = $stateParams.resumeId;
    $scope.jobReferralId = $stateParams.jobReferralId;
    $scope.successMessage = '';
    $scope.errorMessage = '';

    $scope.reference = {};
    ReferralService.getReferenceByResumeId($scope.jobId, $scope.resumeId, $scope.jobReferralId).then(function (results) {
        $scope.reference = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.close = function () {
        $state.go('dashboard');
    };
    $scope.addRecepient = function () {

        if ($scope.emailObjects.length >= 3)
            return;

        $scope.emailObjects.push({
            'email': '',
            'firstName': '',
            'lastName': '',
            'years': 0,
            'personTitle': '',
            'workingRelationshipType': 'Colleague'
        });
    };

    $scope.removeRecepient = function (i) {

        if ($scope.emailObjects.length <= 2)
            return;

        $scope.emailObjects.splice(i, 1);

    };
    var _initEmailObjects = function () {
        $scope.emailObjects = [];
        for (var i = 0; i < 2; i++) {
            $scope.emailObjects.push({
                'email': '',
                'firstName': '',
                'lastName': '',
                'years': 0,
                'personTitle': '',
                'workingRelationshipType': 'Colleague'

            });
        }
    };

    _initEmailObjects();

    $scope.onSave = function (isValid) {
        $scope.successMessage = '';
        $scope.errorMessage = '';
        if (!isValid) {
            $scope.errorMessage = 'Check input data!';
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
            $scope.errorMessage = 'You do not fill emails!';
            return;
        }

        var postsavedata = {
            "jobId": $scope.jobId,
            "recepients": $scope.emailObjects
        };
        var postsavedata = {
            "jobId": $scope.jobId,
            "resumeId": $scope.resumeId,
            "referenceId": $scope.jobReferralId,
            "recepients": $scope.emailObjects
        };

        ReferralService.sendReferenceToFriends(postsavedata).then(function (results) {
            $scope.successMessage = 'References sended successfully!';
            $timeout(function () {
                $scope.successMessage = '';
                $state.go('dashboard');
            }, 1000);

        }, function (error) {
            $scope.errorMessage = 'Error occured!';
            console.log(error.data.message);
        });
    };
});