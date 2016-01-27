angular.module('Jobsite').controller("AddjobformController", function($scope, Login, $sce, $location, $http, ValiDatedTokenObject, RESOURCES, $stateParams, CategoriesService, JobsService) {
//https://github.com/zensh/ui-autocomplete
        $scope.id  = $stateParams.id;

        $scope.EmployeeTypes = RESOURCES.EMPLOYEE_TYPES;
        $scope.categoryID = "";
        $scope.locationID = "";
        $scope.location = "";
        $scope.posteddate = (new Date()).getTime() / 1000;
        $scope.experience = "";
        $scope.jobtype = "";
        $scope.jobTitleLocationEditable = true;
        $scope.jobDescriptionContentEditable = true;
        $scope.jobRequirementsContentEditable = true;
        $scope.aboutUsEditable = true;
        $scope.aboutUsHtmlContent = "";
        $scope.aboutUsContent = $sce.trustAsHtml($scope.aboutUsHtmlContent);
        $scope.jobTitleLocationHtmlContent = "Enter Job Title";
        $scope.jobTitleLocationContent = $sce.trustAsHtml($scope.jobTitleLocationHtmlContent);
        $scope.jobDescriptionHtmlContent = "";
        $scope.jobDescriptionContent = $sce.trustAsHtml($scope.jobDescriptionHtmlContent);
        $scope.jobRequirementsHtmlContent = "";
        $scope.jobRequirementsContent = $sce.trustAsHtml($scope.jobRequirementsHtmlContent);
        $scope.jobTitleLocationResultContent = "Enter Job Title";
        $scope.jobDescriptionResultContent = "";
        $scope.aboutUsResultContent = "";
        $scope.jobRequirementsResultContent = "";
        $scope.tags = [];

        $scope.changeValue = function() {
            if ($scope.locationID > 0) {
                $scope.location = $.grep($scope.locations, function(location) {
                    return location.id == $scope.locationID;
                })[0].name;
            } else {
                $scope.location = "";
            }
        };

        CategoriesService.getCategories().then(function (results) {
            $scope.categories = results.data;
        }, function (error) {
            console.log(error.data.message);
        });

        if ($scope.id != "") {
            JobsService.getJob($scope.id).then(function (results) {
                response = results.data;
                $scope.categoryID = response["categoryId"];
                $scope.locationID = response["locationId"];
                $scope.location = response["location"];
                $scope.tags = response["tags"] == null ? [] : response["tags"];
                $scope.jobTitleLocationEditable = false;
                $scope.jobDescriptionContentEditable = false;
                $scope.jobRequirementsContentEditable = false;
                $scope.aboutUsEditable = false;
                $scope.aboutUsHtmlContent = response["aboutUs"] == "" ? "  <br> " + response["aboutUs"] : response["aboutUs"];
                $scope.posteddate = response["publishedDate"];
                $scope.employeeType = response["employeeType"];
                $scope.experience = response["experience"];
                $scope.jobtype = response["type"];
                $scope.aboutUsContent = $sce.trustAsHtml($scope.aboutUsHtmlContent);
                $scope.jobTitleLocationHtmlContent = response["title"] == "" ? "<br>" + response["title"] : response["title"];
                $scope.jobTitleLocationContent = $sce.trustAsHtml($scope.jobTitleLocationHtmlContent);
                $scope.jobDescriptionHtmlContent = response["description"]==""?"<br>"+response["description"]:response["description"];
                $scope.jobDescriptionContent = $sce.trustAsHtml($scope.jobDescriptionHtmlContent);
                $scope.jobRequirementsHtmlContent = response["requirements"] == "" ? " <br>" + response["requirements"] : response["requirements"];
                $scope.jobRequirementsContent = $sce.trustAsHtml($scope.jobRequirementsHtmlContent);
                $scope.jobTitleLocationResultContent = response["title"];
                $scope.jobDescriptionResultContent = response["description"];
                $scope.aboutUsResultContent = response["aboutUs"];
                $scope.jobRequirementsResultContent = response["requirements"];

            }, function (error) {
                console.log(error.data.message);
            });
        }

        $scope.toggleEdit = function(param) {
            if ("jobTitleLocationEditable" == param) {
                $scope.jobTitleLocationEditable = true;
            } else if ("jobDescriptionContentEditable" == param) {
                $scope.jobDescriptionContentEditable = true;
            } else if ("jobRequirementsContentEditable" == param) {
                $scope.jobRequirementsContentEditable = true;
            } else if ("aboutUsEditable" == param) {
                $scope.aboutUsEditable = true;
            }
        }
        $scope.addtags = function() {
            if ($scope.tags.indexOf($scope.tag) == -1) {
                $scope.tags.push($scope.tag);
                $scope.tag = "";
            }
        };
        $scope.removetag = function(index) {
            $scope.tags.splice(index - 1, 1);
        };
        $scope.saveChanges = function(isValid) {

            if (!isValid || !$scope.tags.length){
                return;
            }
            if (!angular.isUndefined($scope.aboutUsResultContent)) {
                $scope.aboutUsHtmlContent = $scope.aboutUsResultContent;
            }
            if (!angular.isUndefined($scope.jobTitleLocationResultContent)) {
                $scope.jobTitleLocationHtmlContent = $scope.jobTitleLocationResultContent;
            }
            if (!angular.isUndefined($scope.jobDescriptionResultContent)) {
                $scope.jobDescriptionHtmlContent = $scope.jobDescriptionResultContent;
            }
            if (!angular.isUndefined($scope.jobRequirementsResultContent)) {
                $scope.jobRequirementsHtmlContent = $scope.jobRequirementsResultContent;
            }

            $scope.jobTitleLocationEditable = false;
            $scope.jobDescriptionContentEditable = false;
            $scope.jobRequirementsContentEditable = false;
            $scope.aboutUsEditable = false;
            var postsavedata = {
                "title": $scope.jobTitleLocationHtmlContent,
                "description": $scope.jobDescriptionHtmlContent,
                "locationId": $scope.locationID,
                "type": $scope.jobtype,
                "requirements": $scope.jobRequirementsHtmlContent,
                "aboutUs": $scope.aboutUsHtmlContent,
                "experience": $scope.experience,
                "categoryId": $scope.categoryID,
                "tags": $scope.tags,
                "employeeType": $scope.employeeType
            };
            if ($scope.id != "") {

                JobsService.putJob($scope.id, postsavedata).then(function (results) {
                    $location.path("/jobslist");
                }, function (error) {
                    console.log(error.data.message);
                });

            } else {

                JobsService.postJob(postsavedata).then(function (results) {
                    $location.path("/jobslist");
                }, function (error) {
                    console.log(error.data.message);
                });
            }
        }
        $scope.removechanges = function() {

            JobsService.deleteJob($scope.id).then(function (results) {
                $location.path("/jobslist");
            }, function (error) {
                console.log(error.data.message);
            });
        }
    });