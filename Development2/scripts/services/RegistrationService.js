
angular
    .module('Jobsite').service("Registration", function($http,RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;
        this.UserRegister = function(data) {
            var request = $http({
                method: "post",
                url: serviceBase + "account/register",
                data: data
            });
            return request;
        };

    });
