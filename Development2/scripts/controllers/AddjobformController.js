angular.module('Jobsite').controller("AddjobformController", function($scope, Login, $sce, $location, $http, $timeout, ValiDatedTokenObject, RESOURCES, $stateParams, CategoriesService, LocationsService, JobsService, $compile) {
//https://github.com/zensh/ui-autocomplete
        $scope.id  = $stateParams.id;

    /* config object */

        $scope.locationState = {
            id: '',
            name: '',
            value: '',
            label:''
            // some other property
        };

        $scope.locationCity = {
            id: '',
            name: '',
            value: '',
            label:''
            // some other property
        };
        $scope.locationStateOption = {
            options: {
                html: false,
                focusOpen: false,
                onlySelectValid: true,
                source: function (request, response) {
                    if(request.term.length ==0)
                            return;
                    LocationsService.suggestLocations(request.term).then(function (results) {
                        res = results.data;
                        var data =[];
                        for (var i=0; i <res.length; i++ ){
                            var r = res[i];
                            data.push({
                                label: r.text,
                                value: r.text,
                                id: r.id,
                                name: r.text
                            });
                        }
                        response(data);
                    }, function (error) {
                        console.log(error.data.message);
                    });
                }
            },
            methods: {}
        };
        $scope.locationStateOption.events = {
            change: function( event, ui ) {
                $scope.locationCity.id='';
                $scope.locationCity.name='';
                $scope.locationCity.value='';
                $scope.locationCity.label='';
                $scope.locationCityOption.methods.clean();
            },
            close:function( event, ui ) {
                console.log("close");
                $timeout(function() {
                    angular.element('#locationCity').focus();
                });

            }
        };
        $scope.locationCityOption = {
            options: {
                html: false,
                focusOpen: false,
                onlySelectValid: true,
                source: function (request, response) {
                    if(request.term.length ==0)
                        return;
                    LocationsService.suggestLocations(request.term, $scope.locationState.id, 2).then(function (results) {
                        res = results.data;
                        var data =[];
                        for (var i=0; i <res.length; i++ ){
                            var r = res[i];
                            data.push({
                                label: r.text,
                                value: r.text,
                                id: r.id,
                                name: r.text
                            });
                        }
                        response(data);
                    }, function (error) {
                        console.log(error.data.message);
                    });
                }
            },
            methods: {}
        };

        $scope.EmployeeTypes = RESOURCES.EMPLOYEE_TYPES;
        $scope.categoryID = "";

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

        CategoriesService.getCategories().then(function (results) {
            $scope.categories = results.data;
        }, function (error) {
            console.log(error.data.message);
        });

        if ($scope.id != "") {
            JobsService.getJob($scope.id).then(function (results) {
                response = results.data;
                $scope.categoryID = response["categoryId"];

                $scope.locationCity = {
                    id: response["locationId"],
                    name: response["location"],
                    value: response["location"],
                    // some other property
                };

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

                LocationsService.getLocation($scope.locationCity.id).then(function (results) {
                    res = results.data;
                    $scope.locationState = {
                        id: res.parentId,
                        name: res.fullName.split('/')[0],
                        value: res.fullName.split('/')[0],
                        // some other property
                    };
                }, function (error) {
                    console.log(error.data.message);
                });

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

            if (!isValid || !$scope.tags.length || !$scope.locationCity.id){
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
                "locationId": $scope.locationCity.id,
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