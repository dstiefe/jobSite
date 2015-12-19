angular
    .module('Jobsite')
    .controller("AddjobformController", function($scope, Login, $sce, $location, $http, ValiDatedTokenObject) {
        debugger;

        ValiDatedTokenObject.ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
        if (ValiDatedTokenObject.ValiDatedTokenObject == null || ValiDatedTokenObject.ValiDatedTokenObject.access_token == "") {
            //$location.path("/login");
        }
        $url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/';
        $scope.id = $location.absUrl().replace($url, "").replace("views/jobmanagement.html?id=", "");
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
        if ($scope.id != "views/jobmanagement.html") {
            $http({
                    method: 'GET',
                    url: ServicesURL + 'api/v1/jobs/' + $scope.id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Connection': 'keep-alive',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA'
                    }
                })
                .success(function(response) {
                    $scope.categoryID = response["categoryId"];
                    $scope.locationID = response["locationId"];
                    $scope.location = response["location"];
                    $scope.tags = response["tags"];
                    $scope.jobTitleLocationEditable = false;
                    $scope.jobDescriptionContentEditable = false;
                    $scope.jobRequirementsContentEditable = false;
                    $scope.aboutUsEditable = false;
                    $scope.aboutUsHtmlContent = " " + response["aboutUs"];
                    $scope.posteddate = response["publishedDate"];
                    $scope.employeeType = response["employeeType"];
                    $scope.experience = response["experience"];
                    $scope.jobtype = response["type"];
                    $scope.aboutUsContent = $sce.trustAsHtml($scope.aboutUsHtmlContent);
                    $scope.jobTitleLocationHtmlContent = " " + response["title"];
                    $scope.jobTitleLocationContent = $sce.trustAsHtml($scope.jobTitleLocationHtmlContent);
                    $scope.jobDescriptionHtmlContent = " " + response["description"];
                    $scope.jobDescriptionContent = $sce.trustAsHtml($scope.jobDescriptionHtmlContent);
                    $scope.jobRequirementsHtmlContent = " " + response["requirements"];
                    $scope.jobRequirementsContent = $sce.trustAsHtml($scope.jobRequirementsHtmlContent);
                    console.log(response);
                });
        } else {

            $scope.categoryID = "";
            $scope.locationID = "";
            $scope.location = "";
            $scope.posteddate = new Date();
            $scope.experience = "";
            $scope.employeeType = "";
            $scope.jobtype = "";
            $scope.jobTitleLocationEditable = true;
            $scope.jobDescriptionContentEditable = true;
            $scope.jobRequirementsContentEditable = true;
            $scope.aboutUsEditable = true;
            $scope.aboutUsHtmlContent = "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis nihil ad, dicta cumque eum. Quos, laborum recusandae tempore commodi, facilis odit, quibusdam quidem alias magnam aspernatur exercitationem maxime autem culpa.</p> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero qui, consequatur, minima enim, voluptates, laboriosam sint architecto dignissimos ex molestiae possimus voluptatibus ipsa porro ducimus harum. Sed iusto, facilis delectus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero qui, consequatur, minima enim, voluptates, laboriosam sint architecto dignissimos ex molestiae possimus voluptatibus ipsa porro ducimus harum. Sed iusto, facilis delectus.</p>";
            $scope.aboutUsContent = $sce.trustAsHtml($scope.aboutUsHtmlContent);
            $scope.jobTitleLocationHtmlContent = " Job Title <small>At Location Name</small> ";
            $scope.jobTitleLocationContent = $sce.trustAsHtml($scope.jobTitleLocationHtmlContent);
            $scope.jobDescriptionHtmlContent = "<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora doloremque dolore minus possimus, ex aut rem quod dignissimos commodi aliquam labore dicta quis asperiores fuga eveniet ea odio officia voluptates? </p><p><b>COMPANY PROFILE</b><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li></ul></p><p><b>WHAT THIS COMPANY OFFERS YOU</b><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li></ul></p><p><b>LOCATION</b><ul><li>Columbus, OH</li></ul></p><p><b>THE ROLE YOU WILL PLAY</b><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li></ul></p>";
            $scope.jobDescriptionContent = $sce.trustAsHtml($scope.jobDescriptionHtmlContent);
            $scope.jobRequirementsHtmlContent = "<p><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li></ul></p>";
            $scope.jobRequirementsContent = $sce.trustAsHtml($scope.jobRequirementsHtmlContent);
            $scope.tags = [];
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
        $scope.saveChanges = function() {
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
            if ($scope.id != "views/jobmanagement.html") {

                $http({
                        method: 'PUT',
                        url: ServicesURL + 'api/v1/jobs/' + $scope.id,
                        data: postsavedata,
                        headers: {
                            'Content-Type': 'application/json',
                            'Connection': 'keep-alive',
                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA'
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
                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA'
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
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA'
                    }
                })
                .success(function(response) {
                    $location.path("/jobslist");
                });
        }
    });
