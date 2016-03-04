var ServicesURL = "http://ec2-52-90-116-49.compute-1.amazonaws.com:81/jobapi_dev/";
//var ServicesURL = 'http://localhost:41656/';
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
