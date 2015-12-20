/// <reference path="angular.min.js" />  


var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";
var Authorizationtoken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6Iml2YW4zNDQ1IiwibmFtZWlkIjoiZDFkYzRhYjAtNmFmOS00NTNiLWEwNzMtMDEwZTgwZWQ3OTRkIiwic3ViIjoiaXZhbjM0NDUiLCJyb2xlIjoiQWRtaW4iLCJpc3MiOiJodHRwOi8vbmF2aWdhdG9ybGl0aWdhdGlvbi5jb20vSWRlbnRpdHlTZXJ2ZXIvdHJ1c3QiLCJhdWQiOiJ1cm46bmF2aWdhdG9ybGl0aWdhdGlvbmFwaSIsImV4cCI6MTQ1Mjg4NDgwMCwibmJmIjoxNDUwMjkyODAwfQ.YSKqQ87fVgmvGdrL7v-_V2ZNpLleZKoWCWScp47RSWA';
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
