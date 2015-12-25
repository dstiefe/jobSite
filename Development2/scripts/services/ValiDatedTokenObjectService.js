//var ServicesURL = "http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/";
angular
    .module('Jobsite').service("ValiDatedTokenObject", function() {
        var ValiDatedTokenObject = {};

        var getValiDatedTokenObject = function() {
        return ValiDatedTokenObject;
    }

    var setValiDatedTokenObject = function(data) {
        ValiDatedTokenObject = angular.copy(data);
    }

    return {
        getValiDatedTokenObject: getValiDatedTokenObject,
        setValiDatedTokenObject: setValiDatedTokenObject
    }

        //setValiDatedTokenObject 
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
        }

        return {
            ValiDatedTokenObject: ValiDatedTokenObject
        }*/


    });
