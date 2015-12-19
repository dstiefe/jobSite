/// <reference path="angular.min.js" />  


var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";

angular
    .module('Jobsite').service("Login", function($http) {

        this.AuthorizeToken = function(data) {
            var request = $http({
                method: "post",
                url: ServicesURL + "api/v1/token",
                data: data
            });
            return request;
        };

    });


