

/// <reference path="angular.min.js" />  


var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";

app.service("Login", function ($http) {

    this.AuthorizeToken = function (data) {
        var request = $http({
            method: "post",
            url: ServicesURL + "api/v1/token",
            data: data
        });
        return request;
    }; 

})


app.service("Registration", function ($http) {

    this.UserRegister = function (data) {
        var request = $http({
            method: "post",
            url: ServicesURL + "api/v1/account/register",
            data: data
        });
        return request;
    };

})