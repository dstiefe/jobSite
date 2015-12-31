angular
    .module('Jobsite').controller("ViewJobDetailsController", function ($scope, Login, ValiDatedTokenObject,$location, $http, $location) {debugger;
         ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    //if (ValiDatedTokenObject.getValiDatedTokenObject())
    //{
    //    var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
    //    if(role == 'Admin') $location.path("/dashboard");
    //}


    $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
        var parts = $location.absUrl().split("viewjobdetails?id=");
        var viewJobId= parts[1];   
        var req = {
            method: 'GET',
            url: ServicesURL + 'api/v1/jobs/' + viewJobId,
            headers: {
                'Content-Type': 'application/json'
                  }
        }
        $http(req).then(function(data) {
            if (data.status == "200") {
                $scope.jobTitle = data.data.title;
                $scope.jobLocation = data.data.location;
                $scope.jobDescription = data.data.description;
                $scope.jobRequirements = data.data.requirements;
                $scope.employeeType = data.data.employeeType;
                $scope.location = data.data.location;
                $scope.jobtype = data.data.type;
                $scope.experience = data.data.experience;
                $scope.posteddate = data.data.publishedDate;
                $scope.jobAboutus = data.data.aboutUs;

            }
        });
        $scope.onApply = function() {

            $location.path("/dashboard");
        }

    });
