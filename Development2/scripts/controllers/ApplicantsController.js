/**
 * Created by Van on 16.01.2016.
 */
angular.module('Jobsite').controller("ApplicantsController", function($scope, $http, $timeout, ValiDatedTokenObject, $location, AuthService, RESOURCES, $stateParams, ResumesService, $modal) {
    var serviceBase = RESOURCES.API_BASE_PATH;
    var jobId = $stateParams.id;
    var req = {
        method: 'GET',
        url: serviceBase + 'jobs/'+ jobId +'/resumes',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
        }
    }
    $scope.screeningsItems = 0;
    $http(req).then(function(data) {
        if (data.status == "200") {
            $scope.list = data.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
        }
    });
    $scope.deleterecords = function(id) {
        $http({
            method: 'DELETE',
            url: ServicesURL + 'api/v1/jobs/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
            }
        }).
        success(function(response) {
            $http(req).then(function(data) {
                if (data.status == "200") {
                    $scope.list = data.data;
                    console.log($scope.list);
                    $scope.currentPage = 1; //current page
                    $scope.entryLimit = 10; //max no of items to display in a page
                    $scope.filteredItems = $scope.list.length; //Initially for no filter
                    $scope.totalItems = $scope.list.length;
                }
            });
        });

    };
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

    //$scope.testResultsViewShow = function(data) {
    //        var modalInstance = $modal.open({
    //            animation: true,
    //            templateUrl: 'views/TestResult.html',
    //            controller: 'TestResultController',
    //            size : 'lg',
    //            resolve: {
    //                resume: function () {
    //                    return data;
    //                },
    //                jobId: function () {
    //                    return jobId;
    //                }
    //            }});
    //};

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

});