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
                $("#estandares").append("<div class='card mt-3'><div class='btn card-body'><span data-id='" + response[i].idNodo + "' class='estandar'>" + response[i].nombre + "</span><i data-id='" + response[i].idEstandar + "' class='infoEstandar d-block pull-right fas fa-info-circle float-right icono-info' style='font-size:27px' data-placement='top'> </i></div></div>")
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
                $("#exampleModalLabel").html("Referencias");
                $("#referencias").html(response.referencias);
                $("#referencias").html($("#referencias").html().replace(/[\012]/g, "<br>"));
                $("#nodo").html(response.texto);
                $("#nodo").html($("#nodo").html().replace(/[\012]/g, "<br>"));
                $("#imgNodo").attr("src", "");
                if(response.idImagen!=0){GetNodoImage(response.idImagen);}else{$("#imgNodo").hide();}                
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
        
        $("#log").hide();
        $("#content").show();
        
    });
    
    $("#mostrarReferencias").on("click", function(){
        $("#modalReferencias").modal('toggle');
    });
    
    $("body").on("click", ".infoEstandar", function(){
        var idE = $(this).data("id"); 
        
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetEstandar",
                id: idE
            },
            success: function (response) {  
                $("#exampleModalLabel").html("Descripcion");
                $("#referencias").html(response.descripcion);
                $("#referencias").html($("#referencias").html().replace(/[\012]/g, "<br>")); 
                $("#modalReferencias").modal('toggle');
            },
            error: function (xhr) {

            }
        });
    });
    
    function GetNodoImage(idIMG){
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            data: {
                key: "GetImagen",
                id: idIMG
            },
            success: function (response) {
                $("#imgNodo").attr("src", "data:image/png;base64," + response);
                if(response!=""){$("#imgNodo").show();}else{$("#imgNodo").hide();}
            },
            error: function (xhr) {

            }
        });
    }

});