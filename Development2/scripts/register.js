

/// <reference path="angular.min.js" />  
/// <reference path="Module.js" />  
/// <reference path="Service.js" />  


function Validation() {
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

    return IsAllFieldsValidated;
}

// Angular JS controller
angular.module('Jobsite').controller("Registration", function ($scope, AuthService) {

    $scope.IsEmployer = vIsEmployer;

    $scope.Register = function () {
        debugger;
        var UserInfo =
        {
            FirstName: $('#txtfirstname').val(),
            LastName: $('#txtlastname').val(),
            Email: $('#txtEmail').val(),
            UserName: $scope.username,
            password: $scope.password,
            IsEmployer: $('#IsEmployer').is(':checked'),
        }

        
        IsAllFieldsValidated = Validation();
        if (IsAllFieldsValidated === true) {
            $('.splash').show();

            AuthService.saveRegistration(UserInfo).then(function (response) {

                    $('.splash').hide();
                    $('#lblMessage').text("You have successfully register");
                    $('#lblMessage').css('color', 'blue');
                    $('.splash').hide();

                },
                function (response) {
                    $('.splash').hide();
                    var errors = [];
                    for (var key in response.data.ModelState) {
                        for (var i = 0; i < response.data.ModelState[key].length; i++) {
                            errors.push(response.data.ModelState[key][i]);
                        }
                    }
                    $('#lblMessage').text("Failed to register user due to: " + errors.join(' '));

                    //$scope.error_Description = "Failed to register user due to: " + errors.join(' ');
                });
        }
    }

});