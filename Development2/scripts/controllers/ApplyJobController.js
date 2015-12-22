angular
    .module('Jobsite')
    .controller('ApplyJobController', ApplyJobController);

function ApplyJobController($scope, Login, $http, $location) {
    debugger;
    $scope.includeCoverLetter = false;

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

    $scope.submit = function() {
        alert("submitted");

        // 'Redirect' to step 1
        $scope.step = 1;

    }

    $scope.onSubmit = function() {debugger;
        var parts = $location.absUrl().split("applyjob?id=");
        var viewJobId= parts[1];
        var postresumedata = {
                "note": $scope.coverLetterNote,
                "sourceUrl": "Resume.docx",
                "firstName": $scope.accountFirstName,
                "lastName": $scope.accountLastName,
                "email": $scope.accountEmail
            };
          $http({
                        method: 'POST',
                        url: ServicesURL + 'api/v1/jobs/'+viewJobId+'/apply',
                        data: postresumedata,
                        headers: {
                            'Content-Type': 'application/json',
                            'Connection': 'keep-alive',
                            'Authorization': Authorizationtoken
                        }
                    })
                    .success(function(response) {debugger;
                        $scope.jobAppliedDate = response.applyDate;
                        $scope.step = 3;

                    });
    }

    $scope.onClose = function(){
        $location.path("/dashboard");
    }      


}
