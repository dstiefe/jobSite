/// <reference path="angular.min.js" />  
/*
 var ValiDatedTokenObject = {
    
            access_token: "",
            token_type: "",
            expires_in: "",
            userName: "",
            issued: "",
            expires: "",
            role: "",
            id: ""

        };*/
var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";
//var Authorizationtoken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Im1vcmdhbiIsIm5hbWVpZCI6IjliZmQ3ZWExLWQ1MjAtNDE1OC1iZjMyLTk4M2YwMjY3ODQ5MCIsInN1YiI6Im1vcmdhbiIsInJvbGUiOiJBZG1pbiIsImlzcyI6Imh0dHA6Ly9uYXZpZ2F0b3JsaXRpZ2F0aW9uLmNvbS9JZGVudGl0eVNlcnZlci90cnVzdCIsImF1ZCI6InVybjpuYXZpZ2F0b3JsaXRpZ2F0aW9uYXBpIiwiZXhwIjoxNDUzNTM5ODI1LCJuYmYiOjE0NTA5NDc4MjV9.QzzQwi0wJvJrESKYTX4LP0o7dJtREnuUXpMaTSE0c5w';
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
