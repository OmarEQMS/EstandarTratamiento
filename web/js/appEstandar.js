$(document).ready(function () {

    $("#content").hide();
    
    $(".change").on("click", function () {
        $("#log").hide();
        $("#content").hide();
        $("#" + $(this).data("id")).show();
    });

    $('.infoMessage').tooltipster({
        contentCloning: true
    });
    
    $.ajax({
        url: "VisualizacionController",
        method: "POST",
        cache: false,
        dataType: "JSON",
        data: {
            key: "GetEstandares"
        },
        success: function (response) {
            $("#estandares").html("");
            for(var i = 0; i < response.length; i++){
                $("#estandares").append("<div class='card mt-3'><div data-id='" + response[i].idNodo + "' class='btn card-body estandar'>" + response[i].nombre + "</div></div>")
            }
        },
        error: function (xhr) {

        }
    });

    $("body").on("click", ".estandar", function(){
        $("#nombreEstandar").html($(this).html());
    });
        
    $("body").on("click", ".estandar, .opcion", function(){
        var idN = $(this).data("id"); 
       $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetNodo",
                id: idN
            },
            success: function (response) {
                $("#nodo").html(response.texto);
                $("#nodo").html($("#nodo").html().replace(/[\012]/g, "<br>"));
            },
            error: function (xhr) {

            }
        });
        
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetOpcionesPorNodo",
                id: idN
            },
            success: function (response) {
                $("#opciones").html("");
                for(var i = 0; i < response.length; i++){
                    $("#opciones").append("<div class='card subtitle mt-3'><div data-id='" + response[i].idNodo_Sig + "' class='btn card-body opcion' style='border-color: #ff589e; border-width: 3px;'>" + response[i].texto + "</div></div>")
                }
            },
            error: function (xhr) {

            }
        });
        
        $("#imgNodo").hide();
        
        $("#log").hide();
        $("#content").show();
        
    });
    setColors(330,"nodoFondo","nodoBorde");
    setColors(270,"algoritmosFondo","algoritmosBorde");
});