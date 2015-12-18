app.directive('contenteditable', function($sce) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {


                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$evalAsync(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        }
    })
    .controller("AddjobformController", function($scope, Login, $sce) {

        $scope.jobTitleLocationEditable = false;
        $scope.jobDescriptionContentEditable = false;
        $scope.jobRequirementsContentEditable = false;
        $scope.aboutUsEditable = false;
        $scope.aboutUsHtmlContent = "<h3>ABOUT US</h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis nihil ad, dicta cumque eum. Quos, laborum recusandae tempore commodi, facilis odit, quibusdam quidem alias magnam aspernatur exercitationem maxime autem culpa.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero qui, consequatur, minima enim, voluptates, laboriosam sint architecto dignissimos ex molestiae possimus voluptatibus ipsa porro ducimus harum. Sed iusto, facilis delectus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero qui, consequatur, minima enim, voluptates, laboriosam sint architecto dignissimos ex molestiae possimus voluptatibus ipsa porro ducimus harum. Sed iusto, facilis delectus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero qui, consequatur, minima enim, voluptates, laboriosam sint architecto dignissimos ex molestiae possimus voluptatibus ipsa porro ducimus harum. Sed iusto, facilis delectus.</p>";
        $scope.aboutUsContent = $sce.trustAsHtml($scope.aboutUsHtmlContent);
        $scope.jobTitleLocationHtmlContent = "<h3>Job Title <small>At Location Name</small></h3>";
        $scope.jobTitleLocationContent = $sce.trustAsHtml($scope.jobTitleLocationHtmlContent);
        $scope.jobDescriptionHtmlContent = "<h3>JOB DESCRIPTION</h3><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora doloremque dolore minus possimus, ex aut rem quod dignissimos commodi aliquam labore dicta quis asperiores fuga eveniet ea odio officia voluptates? </p><p><b>COMPANY PROFILE</b><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li></ul></p><p><b>WHAT THIS COMPANY OFFERS YOU</b><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non neque exercitationem minus suscipit.</li></ul></p><p><b>LOCATION</b><ul><li>Columbus, OH</li></ul></p><p><b>THE ROLE YOU WILL PLAY</b><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at aliquid alias reprehenderit non quas culpa quibusdam totam mollitia quo.</li></ul></p>";
        $scope.jobDescriptionContent = $sce.trustAsHtml($scope.jobDescriptionHtmlContent);
        $scope.jobRequirementsHtmlContent = "<h3>JOB REQUIREMENTS</h3><p><ul><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li><li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex voluptas, quod excepturi natus! Consequatur ut ipsam.</li></ul></p>";
        $scope.jobRequirementsContent = $sce.trustAsHtml($scope.jobRequirementsHtmlContent);
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

        $scope.saveChanges = function() {
            $scope.aboutUsHtmlContent = $scope.aboutUsResultContent;
            $scope.jobTitleLocationHtmlContent = $scope.jobTitleLocationResultContent;
            $scope.jobDescriptionHtmlContent = $scope.jobDescriptionResultContent;
            $scope.jobRequirementsHtmlContent = $scope.jobRequirementsResultContent;
            $scope.jobTitleLocationEditable = false;
            $scope.jobDescriptionContentEditable = false;
            $scope.jobRequirementsContentEditable = false;
            $scope.aboutUsEditable = false;

        }

    });
