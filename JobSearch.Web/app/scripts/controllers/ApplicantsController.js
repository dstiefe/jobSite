/**
 * Created by Van on 16.01.2016.
 */
//Controller for working with applicants
angular.module('Jobsite').controller("ApplicantsController", function($scope, $http, $timeout, $location,$state, AuthService, RESOURCES, $stateParams, ResumesService, ScreeningsService, JobsService, $modal) {

    var serviceBase = RESOURCES.API_BASE_PATH;
    var jobId = $stateParams.id;
    var resumeId =   $stateParams.resumeId;
    var messageshow =   $stateParams.messageshow;
    $scope.entryLimits = [5, 10, 20, 50, 100];

    if (!AuthService.authentication.isAuth && messageshow == 1 && resumeId){
        $location.search('resumeId', resumeId);
        $location.search('messageshow', messageshow);
        sessionStorage.setItem("return_url", $location.path());
        $location.path("/login");
    }

    if (!AuthService.authentication.isAdministrator)
    {
        $location.path("/login");
    }
    else
    {
        $scope.jobScreenings = [];

        $scope.screeningsItems = 0;

        ResumesService.getApplicants(jobId).then(function (results) {

            $scope.list = results.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;

        }, function (error) {
            console.log(error.data.message);
        });

        ScreeningsService.getScreeningsByJobId(jobId).then(function (results) {
            $scope.jobScreenings = results.data;
        }, function (error) {
            console.log(error.data.message);
        });

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.filter = function() {
            $timeout(function() {
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };
        $scope.sort_by = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };

        $scope.detailViewShow = function(id) {

            ResumesService.searchIntoPageResume(id, 1, '').then(function (results) {

                var data = results.data;
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/ResumeDetailView.html',
                    controller: 'ResumeDetailController',
                    windowClass : 'modal-fullscreen',
                    resolve: {
                        resume: function () {
                            return data;
                        },
                        text: function () {
                            return '';
                        }
                    }
                });

            }, function (error) {
                console.log(error.data.message);
            });
        };

        $scope.arrayNotEmpty = function(item) {
            var len = item.passedScreeningIds  == null ? 0: item.passedScreeningIds.length;
            if ( len == 0) {
                return false;
            } else {
                return true;
            }
        };

        $scope.sendScreeningViewShow = function(data) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/SendScreeningView.html',
                controller: 'SendScreeningController',
                size : 'lg',
                resolve: {
                    resume: function () {
                        return data;
                    },
                    jobId: function () {
                        return jobId;
                    }
                }
            });
        };

        $scope.sendReferenceRequestViewShow = function(data) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/SendReferenceRequestView.html',
                controller: 'SendReferenceRequestController',
                size : 'lg',
                resolve: {
                    resume: function () {
                        return data;
                    },
                    jobId: function () {
                        return jobId;
                    }
                }
            });
        };

        $scope.sendTraitifyViewShow = function(data) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/SendTraitifyRequestView.html',
                controller: 'SendTraitifyRequestController',
                size : 'lg',
                resolve: {
                    resume: function () {
                        return data;
                    },
                    jobId: function () {
                        return jobId;
                    }
                }
            });
        };

        $scope.sendInterviewViewShow = function(data) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/SendInterviewView.html',
                controller: 'SendInterviewController',
                size : 'lg',
                resolve: {
                    resume: function () {
                        return data;
                    },
                    jobId: function () {
                        return jobId;
                    }
                }
            });
        };

        $scope.showCover = function(data) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/ShowCoverView.html',
                controller: 'ShowCoverController',
                size : 'lg',
                resolve: {
                    resume: function () {
                        return data;
                    },
                    jobId: function () {
                        return jobId;
                    }
                }
            });
        };


        var _showMessenger = function(jobId, resumeId, resume){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/MessagesView.html',
                controller: 'MessagesController',
                size : 'lg',
                resolve: {
                    resume: function () {
                        return resume;
                    },
                    resumeId: function () {
                        return resumeId;
                    },
                    jobId: function () {
                        return jobId;
                    },
                    job: function () {
                        return null;
                    }
                }
            });
        };

        if (messageshow == 1 && resumeId){
            _showMessenger(jobId,resumeId,null);
        }

        $scope.sendMessage = function(data) {
            _showMessenger(jobId, data.id, data);

        };

        $scope.downloadReport = function() {
            JobsService.downloadReportByJobId(jobId);
        };
    }
});