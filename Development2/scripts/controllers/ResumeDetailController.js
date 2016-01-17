/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller('ResumeDetailController', function ($scope, $modalInstance, resume, text,ResumesService, $sce) {

    $scope.searchText = (!angular.isUndefinedOrNull(text))? text :'';
    $scope.id = resume.parentDocumentId;
    $scope.resumeSource = '';
    $scope.page = resume.pageNumber;



    var _getResumeSource = function () {
        ResumesService.getPageUrl($scope.id, $scope.page).then(function (results) {
            debugger;

            var _url = results.data.content;

            var host = location.protocol + '//'  + location.host;
            if (location.pathname.indexOf('Development2') != -1){
                host = location.protocol + '//' + location.host + '/Development2';
            }


            var viewrUrl = host + "/pdf-viewer/web/viewer.html?file=" + window.escape(_url) + "#page=" + $scope.page + "&zoom=page-fit&search=" + $scope.searchText + "&phrase=false&phrase=false&hlall=true";
            debugger;
            $scope.resumeSource = viewrUrl;


        }, function (error) {
            console.log(error.data.message);
            $scope.resumeSource = '';
        });
    }
    _getResumeSource();


    $scope.search = function () {
        $scope.page = 1;
        ResumesService.searchIntoResume($scope.id, $scope.searchText).then(function (results) {
            $scope.resume = results.data;
            _getResumeSource();
        }, function (error) {
            console.log(error.data.message);
        });

    };



    $scope.close = function () {
        $modalInstance.close();
    };

});