/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller("SearchResumesController", function($scope, AuthService, $location, SearchResumesParameters, ResumesService, $modal) {

    $scope.isAuth = AuthService.authentication.isAuth;
    $scope.isAdministrator = AuthService.authentication.isAdministrator;
    $scope.isUser = AuthService.authentication.isUser;
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.searchText = SearchResumesParameters.searchText;
    $scope.resumes = [];
    $scope.currentPage = 1;

    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;
    $scope.maxSize = 5;

    $scope.search = function () {
         skip = ($scope.currentPage - 1) * $scope.itemsPerPage;

        ResumesService.searchResumes($scope.searchText, skip, $scope.itemsPerPage).then(function (results) {
            $scope.resumes = results.data;

            ResumesService.searchResumesCount($scope.searchText).then(function (results) {
                $scope.totalItems = results.data.content;
            }, function (error) {
                console.log(error.data.message);
            });

        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.search();

    $scope.detailViewShow = function (data) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/ResumeDetailView.html',
            controller: 'ResumeDetailController',
            //size: 'fullscreen',
            windowClass : 'modal-fullscreen',
            resolve: {
                resume: function () {
                    return data;
                },
                text: function () {
                    return $scope.searchText;
                }
            }
        });
    };

    $scope.pageChanged = function() {
        _search();
    };


});