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

//var Authorizationtoken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Im1vcmdhbiIsIm5hbWVpZCI6IjliZmQ3ZWExLWQ1MjAtNDE1OC1iZjMyLTk4M2YwMjY3ODQ5MCIsInN1YiI6Im1vcmdhbiIsInJvbGUiOiJBZG1pbiIsImlzcyI6Imh0dHA6Ly9uYXZpZ2F0b3JsaXRpZ2F0aW9uLmNvbS9JZGVudGl0eVNlcnZlci90cnVzdCIsImF1ZCI6InVybjpuYXZpZ2F0b3JsaXRpZ2F0aW9uYXBpIiwiZXhwIjoxNDUzNTM5ODI1LCJuYmYiOjE0NTA5NDc4MjV9.QzzQwi0wJvJrESKYTX4LP0o7dJtREnuUXpMaTSE0c5w';
angular
    .module('Jobsite').service("Login", function($http, RESOURCES) {
    var serviceBase = RESOURCES.API_BASE_PATH;
        this.AuthorizeToken = function(data) {
            var request = $http({
                method: "post",
                url: serviceBase + "token",
                data: data
            });
            return request;
        };

    });
