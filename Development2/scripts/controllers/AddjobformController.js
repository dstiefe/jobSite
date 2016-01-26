angular
    .module('Jobsite').controller("AddjobformController", function($scope, Login, $sce, $location, $http, ValiDatedTokenObject, RESOURCES) {


        /*ValiDatedTokenObject.ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
         
        if (ValiDatedTokenObject.ValiDatedTokenObject == null || ValiDatedTokenObject.ValiDatedTokenObject.access_token == "") {
            //$location.path("/login");
        }*/

        ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
        if (ValiDatedTokenObject.getValiDatedTokenObject() == null || ValiDatedTokenObject.getValiDatedTokenObject().access_token == "") {
            $location.path("/login");
        }
        $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
        var parts = $location.absUrl().split("jobmanagemen");
        if (parts[1] == "t")
        { $scope.id = ""; } else { $scope.id = parts[1].replace("t?id=",""); }
         
        console.log($scope.id);
        $http({
            method: 'GET',
            url: ServicesURL + 'api/v1/locations',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(response) {
            $scope.locations = response;
        });
        $http({
            method: 'GET',
            url: ServicesURL + 'api/v1/categories',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(response) {
            $scope.categories = response;
        });
        if ($scope.id != "") {
            $http({
                    method: 'GET',
                    url: ServicesURL + 'api/v1/jobs/' + $scope.id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Connection': 'keep-alive',
                        'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                    }
                })
                .success(function(response) {
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
                    console.log(response);
                    $scope.jobTitleLocationResultContent = response["title"];
                    $scope.jobDescriptionResultContent = response["description"];
                    $scope.aboutUsResultContent = response["aboutUs"];
                    $scope.jobRequirementsResultContent = response["requirements"];
                    $scope.EmployeeTypes = RESOURCES.EMPLOYEE_TYPES;
                });
        } else {

            $scope.categoryID = "";
            $scope.locationID = "";
            $scope.location = "";
            $scope.posteddate = (new Date()).getTime() / 1000;
            $scope.experience = "";
           // $scope.employeeType = -1;
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
            $scope.EmployeeTypes = RESOURCES.EMPLOYEE_TYPES;
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
        $scope.changeValue = function() {
            if ($scope.locationID > 0) {
                $scope.location = $.grep($scope.locations, function(location) {
                    return location.id == $scope.locationID;
                })[0].name;
            } else {
                $scope.location = "";
            }
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

                $http({
                        method: 'PUT',
                        url: ServicesURL + 'api/v1/jobs/' + $scope.id,
                        data: postsavedata,
                        headers: {
                            'Content-Type': 'application/json',
                            'Connection': 'keep-alive',
                            'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                        }
                    })
                    .success(function(response) {
                        $location.path("/jobslist");
                    });

            } else {
                $http({
                        method: 'POST',
                        url: ServicesURL + 'api/v1/jobs',
                        data: postsavedata,
                        headers: {
                            'Content-Type': 'application/json',
                            'Connection': 'keep-alive',
                            'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                        }
                    })
                    .success(function(response) {
                        $location.path("/jobslist");
                    });

            }
        }
        $scope.removechanges = function() {
            $http({
                    method: 'DELETE',
                    url: ServicesURL + 'api/v1/jobs/' + $scope.id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Connection': 'keep-alive',
                        'Authorization': ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token
                    }
                })
                .success(function(response) {
                    $location.path("/jobslist");
                });
        }
    });
