/**
 * Created by Van on 26.02.2016.
 */
angular.module('Jobsite').controller('CreateOrEditResumeController', function ($scope, $modalInstance, UsersService, ResumesService, $sce, $timeout, resumeId) {

    $scope.id = resumeId;

    $scope.resume ={};
    $scope.resume.tags = [];

    UsersService.getMyInfo().then(function (results) {
        $scope.user = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    if (!angular.isUndefined($scope.id) && $scope.id != '') {
        ResumesService.getResume($scope.id).then(function (results) {
            var res = results.data;
            $scope.resume.title = res.title;
            $scope.resume.description =res.body;
            $scope.resume.tags = res.tags;

        }, function (error) {
            console.log(error.data.message);
        });
    }


    $scope.onClose = function() {
        $modalInstance.close();
    };

    $scope.saveChanges = function(isValid) {

        if (!isValid){
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            ResumesService.putResume($scope.id, $scope.resume).then(function (results) {
                $modalInstance.close();
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else{
            ResumesService.postResume($scope.resume).then(function (results) {
                $modalInstance.close();
            }, function (error) {
                console.log(error.data.message);
            });
        }

    };
    $scope.addtags = function() {
        if ($scope.resume.tags.indexOf($scope.tag) == -1) {
            $scope.resume.tags.push($scope.tag);
            $scope.tag = "";
        }
    };
    $scope.removetag = function(index) {
        $scope.resume.tags.splice(index - 1, 1);
    };



});
