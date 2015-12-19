

/*var ValiDatedTokenObject =
{
    access_token: "",
    token_type: "",
    expires_in: "",
    userName: "",
    issued: "",
    expires: ""
}*/


$(document).ready(function () {

    $('.splash').hide();
})


function IsEmptyField(object) {
    if ($('#' + object.id).val() == "") {
        IsAllFieldsValidated = false;
        $('#' + object.id.replace("txt", "lbl_")).text('Please enter ' + $('#' + object.id.replace("txt", "lbl")).text());
    }
    if ($('#' + object.id).val() != "") {
        IsAllFieldsValidated = true;
        $('#' + object.id.replace("txt", "lbl_")).text('');
    }
}


function CompareFields(ControlID1, ControlID2) {
    if ($('#' + ControlID1).val() != $('#' + ControlID2).val()) {
        IsAllFieldsValidated = false;
        $('#lblMessage').text("Does not match " + $('#' + ControlID2.replace("txt", "lbl")).text());
    }
    if ($('#' + ControlID1).val() == $('#' + ControlID2).val()) {
        IsAllFieldsValidated = true;
        $('#lblMessage').text("");
    }
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}