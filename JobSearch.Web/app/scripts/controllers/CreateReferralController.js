/**
 * Created by Van on 03.02.2016.
 */
//Controller for creating referral
angular.module('Jobsite').controller("CreateReferralController", function ($scope, $http, $timeout, $location, ReferralService, CategoriesService, JobsService, $state, $stateParams, $modal, CommonService) {
    $scope.isEmptyOrSpacesHtml = CommonService.isEmptyOrSpacesHtml;
    $scope.id = $stateParams.id;
    $scope.referral = {};
    $scope.referral.sort = 0;

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
        ReferralService.getJobReferral($scope.id).then(function (results) {

            var res = results.data;

            $scope.referral.title = res.title;
            $scope.referral.description = res.description;
            $scope.referral.categoryId = res.categoryId;
            $scope.referral.jobsIds = res.jobsIds;
            $scope.referral.tags = res.tags;


        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function (isValid) {
        if (!isValid||
            CommonService.isEmptyOrSpacesHtml($scope.referral.description)) {
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            ReferralService.putJobReferral($scope.id, $scope.referral).then(function (results) {
                $state.go('editreferral', {'id': $scope.id});
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else {
            ReferralService.postJobReferral($scope.referral).then(function (results) {
                if ($scope.saveAndExit) {
                    $state.go('referrals');
                } else {
                    $state.go('createreferralquestion', {'id': results.data.id});
                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
    };

    $scope.cancel = function () {
        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            $state.go('editreferral', {'id': $scope.id});
        }
        else {
            $state.go('referrals');
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
                    return $scope.referral;
                }
            }
        });

        modalInstance.result.then(function (res) {
            if (res) {
                $scope.referral.tags = res.tags;
            }


        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

    };


});