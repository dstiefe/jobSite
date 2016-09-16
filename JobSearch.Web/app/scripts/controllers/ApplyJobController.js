angular
    .module('Jobsite')
    .controller('ApplyJobController', ApplyJobController);
//Controller for appling job
function ApplyJobController($scope, $http, $location, $modalInstance, ResumesService, RESOURCES, jobId, AuthService, UsersService) {
    var serviceBase = RESOURCES.API_BASE_PATH;
    $scope.jobId = jobId;
    $scope.includeCoverLetter = false;
    $scope.selectedResume = '';
    $scope.resumeFileUrl = '';
    $scope.resumeOriginalFilename = '';
    $scope.loading = false;
    $scope.currentPage = 1;

        $scope.sort_by = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
    if (!AuthService.authentication.isAuth) {
        $location.path("/login");
    }

    ResumesService.getMyResumes().then(function (results) {
        $scope.resumes = results.data;
    }, function (error) {
        console.log(error.data.message);
    });

    $scope.role = AuthService.authentication.isAdministrator ? "Admin" : "User";

    UsersService.accountInfo().then(function (results) {
        $scope.accountFirstName = results.data.firstName;
        $scope.accountLastName = results.data.lastName;
        $scope.accountEmail = results.data.email;
    }, function (error) {
        console.log(error.data.message);
    });

    // Initial step
    $scope.step = 1;

    // Wizard functions
    $scope.wizard = {
        show: function (number) {
            $scope.step = number;
        },
        next: function () {
            $scope.step++;
        },
        prev: function () {
            $scope.step--;
        }
    };

    $scope.uploadFile = function (event) {
        $scope.loading = true;
        var file = event.target.files[0];

        var uploadUrl = serviceBase + 'resumes/upload';
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function (response) {
                $scope.resumeFileUrl = response.storageLocationNative;
                $scope.resumeOriginalFilename = response.originalFilename;
                $scope.wizard.next();
                $scope.loading = false;
            })
            .error(function (response) {
                $scope.loading = false;
                alert('Resume upload failed');
            });

    };

    $scope.onSubmit = function () {
        $scope.loading = true;

        var postresumedata = {
            "note": $scope.coverLetterNote,
            "storageLocationNative": $scope.resumeFileUrl,
            "resumeId": $scope.selectedResume,
            "originalFilename": $scope.resumeOriginalFilename,
            "firstName": $scope.accountFirstName,
            "lastName": $scope.accountLastName,
            "email": $scope.accountEmail
        };

        if ($scope.resumeFileUrl) {
            ResumesService.applyToJob($scope.jobId, postresumedata).then(function (results) {
                var response = results.data;
                $scope.jobAppliedDate = response.applyDate;
                $scope.step = 3;
                $scope.$parent.isApplied = true;
                $scope.loading = false;
            }, function (error) {
                console.log(error.data.message);
                $scope.loading = false;
            });
        } else {
            ResumesService.applyToJobByExistResume($scope.jobId, postresumedata).then(function (results) {
                var response = results.data;
                $scope.jobAppliedDate = response.applyDate;
                $scope.step = 3;
                $scope.$parent.isApplied = true;
                $scope.loading = false;
            }, function (error) {
                console.log(error.data.message);
                $scope.loading = false;
            });
        }
    };

    $scope.onClose = function () {
        $modalInstance.close();
    }

}
