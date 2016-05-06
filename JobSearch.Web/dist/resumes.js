/**
 * Created by Van on 17.01.2016.
 */
$(function() {
    $("#resumes_filter").on('click', function () {
        if ($(".resumes_parameters_panel").is(":hidden")) {
            $(".resumes_parameters_panel").slideDown(300);
        }
        else {
            $(".resumes_parameters_panel").slideUp(300);
        }
    });

    $('.glyphicon-pushpin').on('click', function(){
        $(this).toggleClass('lock');
    });

    $('.right-panel').on('mouseover', function(){
        if (!$(this).hasClass('wide')) {
            $(this).addClass('wide').parent().find('.content-of-document').addClass('short');
        }

    });

    $('.right-panel').on('mouseleave', function(){
        if (!$(this).find('.lock').length) {
            $(this).removeClass('wide').parent().find('.content-of-document').removeClass('short');
        }
    });

});