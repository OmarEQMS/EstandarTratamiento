$(document).ready(function () {

    $("#log").hide();

    $(".collapse").on("click", function(){
        $("#log").hide();
        $("#content").hide();
        $("#" + this.data(id)).hide();
    });

    $('.infoMessage').tooltipster({
    	contentCloning: true
    });
    
    $(".opcion").on("click", function(){
        alert(this.id);
    });

});