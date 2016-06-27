/**
 * Created by Van on 03.02.2016.
 */
//Controller for creating screening
angular.module('Jobsite').controller("CreateScreeningController", function ($scope, $http, $timeout, $location, ScreeningsService, CategoriesService, JobsService, $state, $stateParams, $modal, CommonService) {
    $scope.isEmptyOrSpacesHtml = CommonService.isEmptyOrSpacesHtml;
    $scope.id = $stateParams.id;
    $scope.screening = {};
    $scope.screening.sort = 0;
    //$scope.screening.tags = [];

    CategoriesService.getCategories().then(function (results) {
        $scope.categories = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    JobsService.getMyJobs().then(function (results) {
        $scope.jobs = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    if (!angular.isUndefined($scope.id) && $scope.id != '') {
        ScreeningsService.getScreening($scope.id).then(function (results) {

            var res = results.data;

            $scope.screening.title = res.title;
            $scope.screening.description = res.description;
            $scope.screening.sort = res.sort;
            $scope.screening.isAutoSend = res.isAutoSend;
            $scope.screening.timeToComplete = res.timeToComplete;

            $scope.screening.categoryId = res.categoryId;
            $scope.screening.jobsIds = res.jobsIds;
            $scope.screening.tags = res.tags;

        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function (isValid) {
        if (!isValid ||
            CommonService.isEmptyOrSpacesHtml($scope.screening.description) ) {
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            ScreeningsService.putScreening($scope.id, $scope.screening).then(function (results) {
                $state.go('editscreening', {'id': $scope.id});
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else {
            ScreeningsService.postScreening($scope.screening).then(function (results) {
                if ($scope.saveAndExit) {
                    $state.go('screenings');
                } else {
                    $state.go('createscreeningquestion', {'id': results.data.id});
                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
    };

    $scope.cancel = function () {

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            $state.go('editscreening', {'id': $scope.id});
        }
        else {
            $state.go('screenings');
        }
    };

    $scope.jobsChanged = function () {

        if ($scope.screening.jobsIds != null && $scope.screening.jobsIds.length == 1) {
            ScreeningsService.getNewOrder($scope.screening.jobsIds[0]).then(function (results) {
                $scope.screening.sort = parseInt(results.data.content);
            }, function (error) {
                console.log(error.data.message);
            });
        }
    };

    $scope.manageTags = function () {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/ManageTags.html',
            controller: 'ManageTagsController',
            size: 'md',
            resolve: {
                screening: function () {
                    return $scope.screening;
                }
            }
        });

        modalInstance.result.then(function (res) {
            if (res) {
                $scope.screening.tags = res.tags;
            }


        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

    };


});