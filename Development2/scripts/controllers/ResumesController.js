/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller("ResumesController", function($scope, AuthService, $location, SearchResumesParameters, $modal, ResumesService) {

    $scope.currentPage = 1;

    function getResumes(){
        ResumesService.getMyResumes().then(function (results) {
            $scope.list = results.data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
        }, function (error) {
            console.log(error.data.message);
        });
    }
    getResumes();

    $scope.deleterecords = function(id) {
        ResumesService.deleteResume().then(function (results) {
            getResumes();
        }, function (error) {
            console.log(error.data.message);
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
    $scope.arrayEmptyJob= function(item) {

        //if (!angular.isUndefined(item.jobId)&& item.jobId != null && item.jobId != '')  {
        if (!angular.isUndefined(item.title)&& item.title != null && item.title != '')  {
            return true;
        } else {
            return false;
        }
    };
    $scope.createOrEditResume = function(id) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/CreateOrEditResume.html',
            controller: 'CreateOrEditResumeController',
            size : 'lg',
            resolve: {
                resumeId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function (res) {
            getResumes();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });


    };

});