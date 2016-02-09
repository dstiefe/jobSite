angular
    .module('Jobsite').controller("ViewJobDetailsController", function ($scope, Login, ValiDatedTokenObject, $location, $modal, $http, $location, $sce) {
        
        ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));

        var token ='';
        if (ValiDatedTokenObject.getValiDatedTokenObject()!=null)
        {
            $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
            token = ValiDatedTokenObject.getValiDatedTokenObject().token_type+" "+ValiDatedTokenObject.getValiDatedTokenObject().access_token;
        }

        var parts = $location.absUrl().split("viewjobdetails?id=");
        var viewJobId= parts[1];
          var req = {
            method: 'GET',
            url: ServicesURL + 'api/v1/jobs/' + viewJobId,
            headers: {
                'Content-Type': 'application/json',
               'Authorization': token
            }
        };

        $http(req).then(function(data) {
            if (data.status == "200") {
                $scope.jobTitle =  $sce.trustAsHtml(data.data.title);
                $scope.jobLocation = data.data.location;
                $scope.jobDescription = $sce.trustAsHtml( data.data.description);
                $scope.jobRequirements =  $sce.trustAsHtml(data.data.requirements);
                $scope.employeeType = data.data.employeeType;
                $scope.location = data.data.location;
                $scope.jobtype = data.data.type;
                $scope.experience = data.data.experience;
                $scope.posteddate = data.data.publishedDate;
                $scope.jobAboutus = $sce.trustAsHtml( data.data.aboutUs);
                $scope.applicants = data.data.applicants;
                $scope.isOwn = data.data.isOwn;
                $scope.isApplied = data.data.isApplied;
            }
        });

        $scope.onApply = function() {
            $modal.open({
                templateUrl: 'views/applyjob.html',
                controller: ApplyJobController,
                scope: $scope
            });
        };

        $scope.showReferralView = function() {
            $modal.open({
                animation: true,
                templateUrl: 'views/SendReferral.html',
                controller: 'SendReferralController',
                size : 'lg',
                resolve: {
                    jobId: function () {
                        return viewJobId;
                    },
                    jobTitle: function () {
                        return $scope.jobTitle;
                    }
                }});
        };

    });
