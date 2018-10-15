$(document).ready(function () {

   //Esconder menu lateral a presionar click en el menu hamburguesa
   $('#logCollapse').on('click', () => {
        $('#log, #content').toggleClass('active');
    });

    $('.infoMessage').tooltipster({
    	contentCloning: true
    });
    
    $(".opcion").on("click", function(){
        alert(this.id);
    });

});