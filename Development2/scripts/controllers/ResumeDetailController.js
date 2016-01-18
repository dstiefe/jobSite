/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').controller('ResumeDetailController', function ($scope, $modalInstance, resume, text,ResumesService, $sce, $timeout,$document) {

    $scope.searchText = (!angular.isUndefinedOrNull(text))? text :'';
    $scope.id = resume.parentDocumentId;
    $scope.resumeSource = '';
    $scope.currentPage = resume.pageNumber;
    $scope.totalPages = resume.totalPages;
    $scope.itemsPerPage = 1;
    $scope.maxSize = 5;

    var _getResumeSource = function () {
        ResumesService.getPageUrl($scope.id, $scope.currentPage).then(function (results) {
            var _url = results.data.content;
            var host = location.protocol + '//'  + location.host;
            if (location.pathname.indexOf('Development2') != -1){
                host = location.protocol + '//' + location.host + '/Development2';
            }
            if (!$scope.red){
                _url ='http://ec2-52-0-227-162.compute-1.amazonaws.com:82/Home/DownloadFromBlob?FileString=datageekslaw%2Fbox6c46727b-f59b-472a-8165-6d85012c986a%2Fload4%2Fprocessed%2Fdoc%2FEXHIBIT%2057%2FpdfPages%2FEXHIBIT_57-001.pdf&caseId=6c46727b-f59b-472a-8165-6d85012c986a&oq=http://ec2-52-0-227-162.compute-1.amazonaws.com:82/Home/DownloadFromBlob?FileString=datageekslaw%2Fbox6c46727b-f59b-472a-8165-6d85012c986a%2Fload4%2Fprocessed%2Fdoc%2FEXHIBIT%2057%2FpdfPages%2FEXHIBIT_57-001.pdf&caseId=6c46727b-f59b-472a-8165-6d85012c986a';
            }
            var viewrUrl = host + "/pdf-viewer/web/viewer.html?file=" + window.escape(_url) + "#page=" + $scope.currentPage + "&zoom=page-fit&search=" + $scope.searchText + "&phrase=false&phrase=false&hlall=true";
           // $scope.resumeSource = 'about:blank';
           // $('#pdfViewer').val('');
           // $('#pdfViewer').empty();
           // $document.find("#pdfViewer").empty();
           // angular.element(document.querySelector('#pdfViewer')).empty();

            //$scope.resumeSource = viewrUrl;


           // $document.find("#pdfViewer").remove();
            $scope.resumeSource = viewrUrl;
            //var r = $document.find("#pdfViewer");
            //r[0].contentWindow.location.reload(true);
            //
            //$timeout( function(){
            //    console.log('empty frame');
            //    debugger;
            //
            //    $scope.resumeSource = viewrUrl;
            //    //var r = $document.find("#pdfViewer");
            //    //var r = $document.find("#pdfViewer");
            //    ////r[0].contentWindow.location.reload(true);
            //    //r[0].contentDocument.location.reload(true);
            //    //r.attr("src",r.attr("src"));
            //    //$document.find("#pdfViewer")[0].empty();
            //
            //   // angular.element(document.querySelector('#pdfViewer')).empty();
            //}, 3000);
            //var myEl = angular.element( document.querySelector( '#pdfViewer' ) );
            //debugger;
            //myEl.context.contentWindow.location.reload(true);


        }, function (error) {
            console.log(error.data.message);
            $scope.resumeSource = '';
        });
    }
    _getResumeSource();


    $scope.search = function () {
        $scope.currentPage = 1;
        ResumesService.searchIntoResume($scope.id, $scope.searchText).then(function (results) {
            $scope.resume = results.data;
            _getResumeSource();
        }, function (error) {
            console.log(error.data.message);
        });

    };

    $scope.pageChanged = function() {
        $scope.red =true;

        _getResumeSource();
    };



    $scope.close = function () {
        $modalInstance.close();
    };

});