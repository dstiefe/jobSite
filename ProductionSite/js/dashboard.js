

$(document).ready(function () {
    debugger;
    if (typeof (Storage) !== "undefined") {

        ValiDatedTokenObject = JSON.parse(sessionStorage.getItem("ValiDatedTokenObject"));
        if (ValiDatedTokenObject == null || ValiDatedTokenObject.access_token == "") {
            window.location = "/login.html";
        }
    }
    else {
        alert('Sorry no web stroage support');
        window.location = "/login.html";
    }

})

$(function () {
    $('#cmd_Logout').click(function () {
        sessionStorage.setItem("ValiDatedTokenObject", null);
        window.location = "/login.html";
    })
})