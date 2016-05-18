/**
 * Created by Van on 02.04.2016.
 */
//Controller for working with user dashboard
angular.module('Jobsite').controller("UserDashboardController", function ($rootScope, $scope, $stateParams, $location, $modal, $q, $http, $timeout, AuthService, JobsService, ReferralService, RESOURCES, cfpLoadingBar) {
    debugger;
    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";

    var jobId = $stateParams.jobId;
    var resumeId = $stateParams.resumeId;
    var messageshow = $stateParams.messageshow;

    if (!AuthService.authentication.isAuth && messageshow == 1 && resumeId && jobId) {
        $location.search('jobId', jobId);
        $location.search('resumeId', resumeId);
        $location.search('messageshow', messageshow);
        sessionStorage.setItem("return_url", $location.path());
        $location.path("/login");
    }

    if (!AuthService.authentication.isUser) {
        debugger;
        $location.path("/logout");
    }
    else {
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

        var promise1 = JobsService.getJobsApplied();
        var promise2 = ReferralService.getReferrals();
        var promise3 = ReferralService.getReferences();

        $q.all([promise1, promise2, promise3]).then(function (results) {
            $scope.list = [];
            $scope.list = $scope.list.concat(results[0].data, results[1].data, results[2].data);

            for (var i = 0; i < $scope.list.length; i++)
                $scope.list[i].activeTab = 0;

            _pageCalc();

            $scope.isLoading = false;

        }, function (error) {
            console.log(error.data.message);
            $scope.isLoading = false;
        });

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        var _showMessenger = function (jobId, resumeId, job) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/MessagesView.html',
                controller: 'MessagesController',
                size: 'lg',
                resolve: {
                    resume: function () {
                        return null;
                    },
                    resumeId: function () {
                        return resumeId;
                    },
                    jobId: function () {
                        return jobId;
                    },
                    job: function () {
                        return job;
                    }
                }
            });

            if (job != null) {
                modalInstance.result.then(function (res) {
                    job.messagesCount = 0;
                }, function () {
                    job.messagesCount = 0;
                });
            }
        };

        if (messageshow == 1 && resumeId && jobId) {
            _showMessenger(jobId, resumeId, null);
        }

        $scope.showMessages = function (data) {
            _showMessenger(data.id, data.resumeId, data);
        };
    }
});
