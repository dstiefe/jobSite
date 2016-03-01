/**
 * Created by Van on 23.02.2016.
 */

angular.module('Jobsite').controller('ReferralsController', function ($scope, JobsService, ReferralService, $sce, $timeout, $document) {


    $scope.currentPage = 1;

    ReferralService.getMyJobReferrals().then(function (results) {
        $scope.list = results.data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter
        $scope.totalItems = $scope.list.length;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.deleterecords = function(record) {
        ReferralService.deleteJobReferral(record.id).then(function (results) {
            $scope.list.splice( $scope.list.indexOf(record), 1 );
            $scope.filteredItems = $scope.list.length; //Initially for no filter
            $scope.totalItems = $scope.list.length;
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

});
