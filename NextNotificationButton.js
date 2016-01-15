// ==UserScript==
// @name           Next Notification Button
// @description    Skrypt dodaje przycisk do przechodzenie do pierwszego linku z listy powiadomień.   
// @namespace      http://www.wykop.pl/ludzie/mrleon/
// @author         mrleon
// @version        1.1
// @include        http://www.wykop.pl/wpis/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

var main = function () {
    var button = "<ul><li'><a href='#' id='nextNotification'><span>Dalej</span></a></li></ul>";
    var ul = document.getElementsByClassName('info m-reset-float m-hide')[0];
    $(ul).after(button);

    var goNext = false;
    var isMiddleButton = false;

    $('#nextNotification').click(function (event) {
        goNext = true;
        event.preventDefault();
        wykop._ajaxCall($(this), (wykop.params["base"] + 'ajax2/powiadomienia/hashtags/' + wykop.params["hash"] +"//hash/" + wykop.params["hash"] + wykop.useBrowserNotifications).replace("false", ""));
        console.log(event.which);
        if (event.which == 2)
        {
            isMiddleButton = true;
            console.log("dupa");
        }

    });

    wykop.handleNotificationsList = function ($el, data)
    { 
        $(".notificationsContainer").hide(); 
        $el.closest(".notification").find(".notificationsContainer").replaceWith(data.html); 
        $el.closest(".notification").find(".notificationsContainer").show(); 

        if (goNext)
        {
            var parsed = $.parseHTML(data.html);
            var index = 2;
            if($("div>ul>li:first", parsed).hasClass("type-light-warning"))
            {
                index = 3;
            }
            var url = $("div>ul>li:first>p>a", parsed).eq(index).attr("href");
            if (isMiddleButton)
            {
                isMiddleButton = false;

                var a = $("<a id='bartek' target='_blank'>Test</a>").attr({ href : url}).appendTo('#nav');
                var e = jQuery.Event("click");
                e.ctrlKey = true;
                $('#bartek')[0].trigger(e);
                console.log("dupa");
            }
            else
            {
                window.location.href = url;
            }
        }
    };                           
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);