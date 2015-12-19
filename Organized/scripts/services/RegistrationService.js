var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";

angular
    .module('Jobsite').service("Registration", function($http) {

        this.UserRegister = function(data) {
            var request = $http({
                method: "post",
                url: ServicesURL + "api/v1/account/register",
                data: data
            });
            return request;
        };

    });
