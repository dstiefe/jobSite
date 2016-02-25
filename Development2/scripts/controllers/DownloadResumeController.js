/**
 * Created by Van on 26.02.2016.
 */
/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller('DownloadResumeController', function ($scope, ResumesService, $sce, $timeout, $stateParams) {


    $scope.id = $stateParams.id;
    ResumesService.getNativeUrl($scope.id).then(function (results) {
        var _url = results.data.content;

        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href',_url);
        downloadLink[0].click();

    }, function (error) {
        console.log(error.data.message);
    });

});