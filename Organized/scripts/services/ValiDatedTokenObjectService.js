
var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";
angular
    .module('Jobsite').service("ValiDatedTokenObject", function() {

        var ValiDatedTokenObject = {
            access_token: "",
            token_type: "",
            expires_in: "",
            userName: "",
            issued: "",
            expires: ""
        }

        return {
            ValiDatedTokenObject: ValiDatedTokenObject
        }


    });