

/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  

$(document).ready(function () {



})


$(function () {
    $('#cmd_Register').click(function () {

        var objUsername = $('#txtusername');

        var objfirstname = $('#txtfirstname');
        var objlastname = $('#txtlastname');
        var objpassword = $('#txtpassword');
        var objcpassword = $('#txtcpassword');
        var objemail = $('#txtEmail');
        var objcemail = $('#txtcemail');

        if ($(objUsername.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objUsername.selector.replace("txt", "lbl_")).text("Please enter " + $(objUsername.selector.replace("txt", "lbl")).text());
        }

        if ($(objfirstname.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objfirstname.selector.replace("txt", "lbl_")).text("Please enter " + $(objfirstname.selector.replace("txt", "lbl")).text());
        }

        if ($(objlastname.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objlastname.selector.replace("txt", "lbl_")).text("Please enter " + $(objlastname.selector.replace("txt", "lbl")).text());
        }

        if ($(objpassword.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objpassword.selector.replace("txt", "lbl_")).text("Please enter " + $(objpassword.selector.replace("txt", "lbl")).text());
        }

        if ($(objcpassword.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objcpassword.selector.replace("txt", "lbl_")).text("Please enter " + $(objcpassword.selector.replace("txt", "lbl")).text());
        }

        if ($(objemail.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objemail.selector.replace("txt", "lbl_")).text("Please enter " + $(objemail.selector.replace("txt", "lbl")).text());
        }

        if ($(objcemail.selector).val() == "") {
            IsAllFieldsValidated = false;
            $(objcemail.selector.replace("txt", "lbl_")).text("Please enter " + $(objcemail.selector.replace("txt", "lbl")).text());
        }

        if ($('#txtEmail').val() != $('#txtEmail').val()) {
            IsAllFieldsValidated = false;
            $('#lblMessage').text("Does not match Repeat Email Address");
        }

        if ($('#txtpassword').val() != $('#txtcpassword').val()) {
            IsAllFieldsValidated = false;
            $('#lblMessage').text("Does not match Repeat Password");
        }
        if (validateEmail($('#txtEmail').val()) === false) {
            IsAllFieldsValidated = false;
            $('#lblMessage').text("Invalid email address entered");
        }

        if ($('#txtpassword').val().length < 6) {
            IsAllFieldsValidated = false;
            $('#lblMessage').text("Password should be atleast 6 character.");
        }


    })
})

// Angular JS controller
app.controller("Registration", function ($scope, Registration) {

    $scope.IsEmployer = vIsEmployer;

    $scope.Register = function () {
        var UserInfo =
        {
            FirstName: $scope.firstname,
            LastName: $scope.lastname,
            Email: $scope.email,
            UserName: $scope.username,
            password: $scope.password,
            IsEmployer: $('.icheckbox_square-green').hasClass('checked'),
        }

        console.log(UserInfo);

        if (IsAllFieldsValidated === true) {
            var PostRequest = Registration.UserRegister(UserInfo);
            PostRequest.then(function (RequestResult) {
                if (RequestResult.status === 200) {
                    alert("You have successfully register");
                }
            },
            function (error) {
                $('.splash').hide();
                if (error.status === 400) {
                    $scope.error_Description = error.data.error_description;
                }

                console.log("Error", error);


            })

        }
    }

});