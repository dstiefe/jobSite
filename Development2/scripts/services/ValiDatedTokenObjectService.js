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
