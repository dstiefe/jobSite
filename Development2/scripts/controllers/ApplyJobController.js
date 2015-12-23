angular
    .module('Jobsite').directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

/*angular
    .module('Jobsite').service('fileUpload', ['$http', function($http) {
        this.uploadFileToUrl = function(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function() {})
                .error(function() {});
        }
    }]);*/

angular
    .module('Jobsite')
    .controller('ApplyJobController', ApplyJobController);

function ApplyJobController($scope, Login, $http, $location, $modalInstance) {
    debugger;
    $scope.includeCoverLetter = false;
    var resumeFileUrl;

    var req = {
        method: 'GET',
        url: ServicesURL + 'api/v1/account/userinfo',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': Authorizationtoken
        }
    }
    $http(req).then(function(data) {
        if (data.status == "200") {
            $scope.accountFirstName = data.data.firstName;
            $scope.accountLastName = data.data.lastName;
            $scope.accountEmail = data.data.email;
        }
    });


    // Initial step
    $scope.step = 1;

    // Wizard functions
    $scope.wizard = {
        show: function(number) {
            $scope.step = number;
        },
        next: function() {
            $scope.step++;
        },
        prev: function() {
            $scope.step--;
        }
    };

    $scope.uploadFile = function() {
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        var uploadUrl = ServicesURL + 'api/v1/resumes/upload';
        //ileUpload.uploadFileToUrl(file, uploadUrl);
        var fd = new FormData();
            fd.append('file', file);
           $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': Authorizationtoken
                    }
                })
                .success(function(response) {debugger;
                    resumeFileUrl = response.storageLocationNative;
                    alert('Resume upload success');
                })
                .error(function(response) {
                    alert('Resume upload failed');
                });

    };

    $scope.onSubmit = function() {
        debugger;
        var parts = $location.absUrl().split("dashboard?id=");
        var viewJobId = parts[1];
        var postresumedata = {
            "note": $scope.coverLetterNote,
            "sourceUrl": resumeFileUrl,
            "firstName": $scope.accountFirstName,
            "lastName": $scope.accountLastName,
            "email": $scope.accountEmail
        };
        $http({
                method: 'POST',
                url: ServicesURL + 'api/v1/jobs/' + viewJobId + '/apply',
                data: postresumedata,
                headers: {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Authorization': Authorizationtoken
                }
            })
            .success(function(response) {
                $scope.jobAppliedDate = response.applyDate;
                $scope.step = 3;

            });
    }

    $scope.onClose = function() {
        $modalInstance.close();
    }


}
