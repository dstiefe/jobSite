/**
 * Created by Van on 26.02.2016.
 */
//Controller for creating/editing resume
angular.module('Jobsite').controller('CreateOrEditResumeController', function ($scope, $modalInstance, UsersService, ResumesService, $sce, $timeout, resumeId) {

    $scope.id = resumeId;

    $scope.resume = {};
    $scope.resume.tags = [];
    $scope.loading = false;
    $scope.message = '';
    UsersService.getMyInfo().then(function (results) {
        $scope.user = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    if (!angular.isUndefined($scope.id) && $scope.id != '') {
        ResumesService.getResume($scope.id).then(function (results) {
            var res = results.data;
            $scope.resume.title = res.title;
            $scope.resume.description = res.description;
            $scope.resume.tags = res.tags;
            if ($scope.resume.tags == null)
                $scope.resume.tags = [];

            $scope.resume.originalFilename = res.originalFilename;
            $scope.resume.storageLocationNative = res.storageLocationNative;

        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.uploadFile = function (event) {

        $scope.loading = true;

        var file = event.target.files[0];

        ResumesService.uploadResume(file).then(function (results) {
            var response = results.data;
            $scope.resume.storageLocationNative = response.storageLocationNative;
            $scope.resume.originalFilename = response.originalFilename;
            $scope.loading = false;

        }, function (error) {
            $scope.loading = false;
            console.log(error.data.message);
            alert('Resume upload failed');
        });
    };


    $scope.onClose = function () {
        $modalInstance.close();
    };

    $scope.saveChanges = function (isValid) {

        if (!isValid || !$scope.resume.originalFilename) {
            $scope.message = "You don't fill all fields";
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            ResumesService.putResume($scope.id, $scope.resume).then(function (results) {
                $modalInstance.close({
                    'isUpdated': true
                });
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else {
            ResumesService.postResume($scope.resume).then(function (results) {
                $modalInstance.close({
                    'isUpdated': true
                });
            }, function (error) {
                console.log(error.data.message);
            });
        }

    };
    $scope.addtags = function () {
        if ($scope.resume.tags.indexOf($scope.tag) == -1) {
            $scope.resume.tags.push($scope.tag);
            $scope.tag = "";
        }
    };
    $scope.removetag = function (index) {
        $scope.resume.tags.splice(index - 1, 1);
    };


});
