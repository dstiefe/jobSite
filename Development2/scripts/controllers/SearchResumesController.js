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
    $scope.page = 0;
    $scope.count = 10;

    var _search = function () {
        skip = $scope.page * $scope.count;
        _count = skip + $scope.count;
        ResumesService.searchResumes($scope.searchText, skip, _count).then(function (results) {
            $scope.resumes = results.data;
        }, function (error) {
            console.log(error.data.message);
        });
    }
    _search();

    $scope.search = function () {
        _search();
    };

    $scope.detailViewShow = function (data) {
        debugger;
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

});