/**
 * Created by Van on 17.01.2016.
 */
//Controller for showing resume detail
angular.module('Jobsite').controller('ResumeDetailController', function ($scope, $modalInstance, ResumesService, $sce, $timeout, $document, resume, text) {

    $scope.searchText = (!angular.isUndefinedOrNull(text))? text :'';
    $scope.id = resume.parentDocumentId;
    $scope.resumeSource = '';
    $scope.currentPage = resume.pageNumber;
    $scope.totalPages = resume.totalPages;
    $scope.resume = resume;
    if ($scope.resume.adminTags == null){
        $scope.resume.adminTags=[];
    }
    if ($scope.resume.adminNotes== null){
        $scope.resume.adminNotes=[];
    }

    $scope.itemsPerPage = 1;
    $scope.maxSize = 5;
    $scope.shareBoxVisible = false;
    $scope.isShowAdminNotes = false;
    $scope.isShowAdminTags = false;
    $scope.adminTag = '';
    $scope.adminNote = '';

    function SetEmailLink(){
        var host = location.protocol + '//'  + location.host;
        if (location.pathname.indexOf('JobSearch.Web') != -1){
            host = location.protocol + '//' + location.host + '/JobSearch.Web';
        }
        var url= host + '/index.html#/download_resume/'+ $scope.id;
        $scope.emailLink = "mailto:?subject=Resume&body="+encodeURIComponent(url);
    }

    SetEmailLink();


    var _getResumeSource = function () {
        ResumesService.getPageUrl($scope.id, $scope.currentPage).then(function (results) {
            var _url = results.data.content;
            var host = location.protocol + '//'  + location.host;
            if (location.pathname.indexOf('JobSearch.Web') != -1){
                host = location.protocol + '//' + location.host + '/JobSearch.Web';
            }
            var viewrUrl = host + "/pdf-viewer/web/viewer.html?file=" + window.escape(_url) + "#page=1&zoom=page-fit&search=" + $scope.searchText + "&phrase=false&hlall=true";
            $scope.resumeSource = viewrUrl;
        }, function (error) {
            console.log(error.data.message);
            $scope.resumeSource = '';
        });
    }
    _getResumeSource();

    $scope.search = function () {
        ResumesService.searchIntoPageResume($scope.id, $scope.currentPage, $scope.searchText).then(function (results) {
            $scope.resume = results.data;
            $scope.currentPage = $scope.resume.pageNumber;
            $scope.totalPages = $scope.resume.totalPages;
            if ($scope.resume.adminTags == null){
                $scope.resume.adminTags=[];
            }
            if ($scope.resume.adminNotes== null){
                $scope.resume.adminNotes=[];
            }
            _getResumeSource();
        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.pageChanged = function() {
        _getResumeSource();
    };

    $scope.ClickOnNeighborsPage = function(page, total) {
        $scope.currentPage = page;
        _getResumeSource();
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.dowloadResume = function () {
        ResumesService.getNativeUrl($scope.id).then(function (results) {
            var _url = results.data.content;

            var downloadLink = angular.element('<a></a>');
            downloadLink.attr('href',_url);
            downloadLink[0].click();

        }, function (error) {
            console.log(error.data.message);
        });
    };

    $scope.openShare = function() {
        $scope.shareBoxVisible = true;
    };

    window.onclick = function () {
        if ($scope.shareBoxVisible) {
            $scope.shareBoxVisible = false;
        }
    }
    $scope.printElem = function() {


        var getMyFrame = document.getElementById('pdfViewer');
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
        //Popup($("#pdfViewer").contents().find("html").html());
    };
    function Popup(data) {
        console.log(data);
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>my div</title>');
        /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    };

    $scope.addAdminTag = function() {
        if ($scope.resume.adminTags.indexOf($scope.adminTag) == -1) {


            var req =  $scope.resume.adminTags.slice(0);
            req.push($scope.adminTag);
            var data ={
                'Tags': req
            };

            ResumesService.addAdminTags($scope.id, $scope.currentPage, data).then(function (results) {
                $scope.resume.adminTags.push($scope.adminTag);
                $scope.adminTag = "";
            }, function (error) {
                console.log(error.data.message);
            });

        }
    };
    $scope.removeAdminTag = function(index) {

        var req =  $scope.resume.adminTags.slice(0);
        req.splice(index, 1);
        var data ={
            'Tags': req
        };
        ResumesService.addAdminTags($scope.id, $scope.currentPage,data).then(function (results) {
            $scope.resume.adminTags.splice(index, 1);
        }, function (error) {
            console.log(error.data.message);
        });

    };


    $scope.addAdminNote = function() {
        if ($scope.resume.adminNotes.indexOf($scope.adminNote) == -1) {

            var req =  $scope.resume.adminNotes.slice(0);
            req.push($scope.adminNote);
            var data ={
                'Notes': req
            };

            ResumesService.addAdminNotes($scope.id, $scope.currentPage, data).then(function (results) {
                $scope.resume.adminNotes.push($scope.adminNote);
                $scope.adminNote = "";
            }, function (error) {
                console.log(error.data.message);
            });


        }
    };
    $scope.removeAdminNote = function(index) {

        var req =  $scope.resume.adminNotes.slice(0);
        req.splice(index, 1);
        var data ={
            'Notes': req
        };
        ResumesService.addAdminNotes($scope.id, $scope.currentPage, data).then(function (results) {
            $scope.resume.adminNotes.splice(index, 1);
        }, function (error) {
            console.log(error.data.message);
        });
    };
});