$(document).ready(function () {
    $("#msj-error").hide();
    var AceptarCookies = getCookie("AceptarCookies");

    $("#password").on("click", function () {
        $("#msj-error").hide();
    });
    
    $("#btn-login").on("click", function () {
        AceptoCookies();
    });

    $('#password').on('keydown', function (e) {
        if (e.which == 13) {
            AceptoCookies();
            e.preventDefault();
        }
    });

    function AceptoCookies() {
        if (AceptarCookies == "") {
            swal({
                title: "Cookies",
                text: "Para brindarte un mejor servicio, este sitio usa cookies",
                buttons: {aceptar: {text: "Aceptar", value: "aceptar"}},
            }).then((value) => {
                if (value == "aceptar") {
                    createCookie("AceptarCookies", 1, 365);
                    LogIn();
                }
            });
        } else {
            LogIn();
        }
    }

    function LogIn() {
        var pass = $("#password").val();
        $.ajax({
            url: "Estandar",
            method: "POST",
            cache: false,
            data: {
                pass: pass
            },
            success: function (response) {
                if (response == "error") {
                    $("#msj-error").show();
                } else {
                    document.open("text/html", "replace");
                    document.write(response);
                    document.close();
                }
            },
            error: function (xhr) {
                
            }
        });
    }

    var createCookie = function (name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

});