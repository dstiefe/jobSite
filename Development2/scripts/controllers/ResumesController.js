/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller("ResumesController", function($scope, AuthService, $location, SearchResumesParameters, ResumesService, $modal) {

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

    var _countS = function () {
        ResumesService.searchResumesCount($scope.searchText).then(function (results) {
            $scope.totalItems = results.data.content;
        }, function (error) {
            console.log(error.data.message);
        });
    }
    var _search = function () {
        skip = ($scope.currentPage - 1) * $scope.itemsPerPage;

        ResumesService.searchResumes($scope.searchText, skip, $scope.itemsPerPage).then(function (results) {
            $scope.resumes = results.data;
        }, function (error) {
            console.log(error.data.message);
        });
    }
    _search();
    _countS();

    $scope.search = function () {
        _search();
        _countS();
    };

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