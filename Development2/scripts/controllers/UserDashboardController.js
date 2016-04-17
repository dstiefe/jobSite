/**
 * Created by Van on 02.04.2016.
 */
angular.module('Jobsite').controller("UserDashboardController", function ($rootScope, $scope, ValiDatedTokenObject, locationHistoryService, $location, $modal, $http, $timeout, AuthService, JobsService, ReferralService, RESOURCES, cfpLoadingBar) {$scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";
   $scope.entryLimits = [5, 10, 15, 20, 25];
   $scope.isLoading = true;
   var serviceBase = RESOURCES.API_BASE_PATH;
   var _pageCalc = function () {
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter
        $scope.totalItems = $scope.list.length;
    };

   $scope.activeTab = 'JobDescription';

   JobsService.getJobsApplied().then(function (results) {
            $scope.list = results.data;

            ReferralService.getReferrals().then(function (results2) {
                $scope.list = $scope.list.concat(results2.data);
                ReferralService.getReferences().then(function (results3) {
                    $scope.list = $scope.list.concat(results3.data);

                    for(var i= 0; i< $scope.list.length; i++)
                        $scope.list[i].activeTab = 0;

                    _pageCalc();
                    $scope.isLoading = false;
                }, function (error) {
                    console.log(error.data.message);
                    $scope.isLoading = false;
                });
            }, function (error) {
                console.log(error.data.message);
                $scope.isLoading = false;
            });

        }, function (error) {
      console.log(error.data.message);
      $scope.isLoading = false;
   });

   $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.showMessages = function (data) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/MessagesView.html',
            controller: 'MessagesController',
            size : 'lg',
            resolve: {
                resume: function () {
                    return null;
                },
                resumeId: function () {
                    return data.resumeId;
                },
                jobId: function () {
                    return data.id;
                },
                job: function () {
                    return data;
                }
            }
        });
    };

});
