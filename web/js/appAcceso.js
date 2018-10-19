$(document).ready(function () {
    
    $("#btn-login").on("click", function(){
       var pass = $("#password").val();
       $.postGo("Estandar", {
            pass: pass
        });
    });
    
    $('#password').on('keydown', function(e) {
        if (e.which == 13) {
            var pass = $("#password").val();
            $.postGo("Estandar", {
                 pass: pass
             });
            e.preventDefault();
        }
    });
    
});