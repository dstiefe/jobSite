/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("CreateScreeningController", function($scope, Login, $http, $timeout, $location, ScreeningsService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.screening = {};

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
            $scope.screening.description =res.description;
            $scope.screening.sort = res.sort;
            $scope.screening.timeToComplete = res.timeToComplete;
            $timeout(function() {
                $scope.screening.categoryId = res.categoryId;
                $scope.screening.jobsIds =res.jobsIds;
            }, 10);

        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function(isValid) {

        if (!isValid){
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            ScreeningsService.putScreening($scope.id, $scope.screening).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('screenings');
                }else{
                    $state.go('createscreeningquestion', {'id': results.data.id});
                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else{
            ScreeningsService.postScreening($scope.screening).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('screenings');
                }else{
                    $state.go('createscreeningquestion', {'id': results.data.id});
                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
    }

    $scope.cancel = function() {
         $state.go('screenings');
    }

});