$(document).ready(function () {

    $("#log").hide();

    $(".change").on("click", function(){
        $("#log").hide();
        $("#content").hide();
        $("#" + $(this).data("id")).show();
    });

    $('.infoMessage').tooltipster({
    	contentCloning: true
    });
    
    $(".opcion").on("click", function(){
        alert(this.id);
    });

});