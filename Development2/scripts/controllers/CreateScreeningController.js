/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("CreateScreeningController", function($scope, Login, $http, $timeout, $location, ScreeningsService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.screening = {}
    $scope.title = '';
    $scope.description ='';
    $scope.categoryId ='';
    $scope.jobsIds ='';
    $scope.sort ='';
    $scope.timeToComplete ='';

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

    if ($scope.id != '') {
        ScreeningsService.getScreening($scope.id).then(function (results) {
            var res = results.data;

            $scope.title = res.title;
            $scope.description =res.description;
            $scope.sort = res.sort;
            $scope.timeToComplete = res.timeToComplete;
            $scope.categoryId = res.categoryId;
            $scope.jobsIds =res.jobsIds;

        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function(isValid) {

        if (!isValid){
            return;
        }
        var data = {
            "title": $scope.title,
            "description": $scope.description,
            "sort": $scope.sort,
            "timeToComplete": $scope.timeToComplete,
            "categoryId": $scope.categoryId,
            "jobsIds": $scope.jobsIds
        };

        if ($scope.id != '') {
            ScreeningsService.putScreening($scope.id, data).then(function (results) {
                $state.go('createscreeningquestion', {'id': results.data.id});
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else{
            ScreeningsService.postScreening(data).then(function (results) {
                $state.go('createscreeningquestion', {'id': results.data.id});
            }, function (error) {
                console.log(error.data.message);
            });
        }
    }
});