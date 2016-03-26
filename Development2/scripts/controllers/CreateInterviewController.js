/**
 * Created by Van on 03.02.2016.
 */
angular.module('Jobsite').controller("CreateInterviewController", function($scope, Login, $http, $timeout, $location, InterviewsService, CategoriesService, JobsService, $state, $stateParams) {

    $scope.id = $stateParams.id;
    $scope.interview = {};
    $scope.interview.sort = 0;

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
        InterviewsService.getInterview($scope.id).then(function (results) {

            var res = results.data;

            $scope.interview.title = res.title;
            $scope.interview.description =res.description;
            $scope.interview.categoryId = res.categoryId;
            $scope.interview.jobsIds =res.jobsIds;


        }, function (error) {
            console.log(error.data.message);
        });
    }

    $scope.saveChanges = function(isValid) {
        if (!isValid){
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            InterviewsService.putInterview($scope.id, $scope.interview).then(function (results) {
                $state.go('editinterview', {'id': $scope.id});
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else{
            InterviewsService.postInterview($scope.interview).then(function (results) {
                if ($scope.saveAndExit){
                    $state.go('interviews');
                }else{
                    $state.go('createinterviewquestion', {'id': results.data.id});
                }
            }, function (error) {
                console.log(error.data.message);
            });
        }
    }

    $scope.cancel = function() {
        if (!angular.isUndefined($scope.id) && $scope.id != '')
        {
            $state.go('editinterview', {'id': $scope.id});}
        else{
            $state.go('interviews');
        }
    }
    $scope.$back = function() {
        window.history.back();
    };

});