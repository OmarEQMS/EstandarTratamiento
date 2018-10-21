$(document).ready(function () {    
    
    $("#content").hide();    
   
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
                $("#estandares").append("<div class='card mt-3'><div class='btn card-body algoritmosBorde'><span data-id='" + response[i].idNodo + "' class='estandar'>" + response[i].nombre + "</span><i data-id='" + response[i].idEstandar + "' class='infoEstandar d-block pull-right fas fa-info-circle float-right icono-info' style='font-size:27px' data-placement='top'> </i></div></div>")
            }
            setColors(270,"algoritmosFondo","algoritmosBorde");
        },
        error: function (xhr) {

        }
    });
    
    $(".change").on("click", function () {
        $("#menu").hide();
        $("#content").hide();
        $("#" + $(this).data("id")).show();
    });

    $("body").on("click", ".estandar", function(){
        $("#nombreEstandar").html($(this).html());
        $(".historialDecisiones").html("");
        //BORRAR HISTORIAL
    });
    
    $("body").on("click", ".opcion", function(){
        if($(this).data("log")!=""){
            $(".historialDecisiones").html("<div data-id='" + $(this).data("idpadre") + "' class='card btn historialDecisionesBoton'><button class='btn'><i class='fas fa-chevron-left'></i></button>&nbsp;" + $(this).data("log") + "&nbsp;</div>" + $(".historialDecisiones").html());
        }        
        //AGREGAR HISTORIAL - $(this).data("idopcion")
    });
    
    $("body").on("click", ".historialDecisionesBoton", function(){
        var idN = $(this).data("id");
        var actual = this
        var bool = true;
        $('.historialDecisiones').children().each(function () {
            if(bool==true){
                this.remove();
            }
            if(actual==this){
                bool = false;
            }
        });
        //BORRAR HISTORIAL
        CargarNodo(idN); 
    });    
        
    $("body").on("click", "#verEstandares", function(){
        $("#menu").show();
        $("#content").hide();
    }); 
    
    //$("body").on("click", "#verFlujo", function(){}); 
    
    $("#mostrarReferencias").on("click", function(){
        $("#modalReferencias").modal('toggle');
    });
    
    $("body").on("click", ".estandar, .opcion", function(){
        var idN = $(this).data("id");        
        CargarNodo(idN);        
    });
    
    function CargarNodo(idN){
        $("#imgNodo").attr("src", "");
        $("#nodo").html("");
        $("#imgNodo").hide();
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
                if(response.idImagen!=0){GetNodoImage(response.idImagen);}else{$("#imgNodo").hide();}                
            },
            error: function (xhr) {

            }
        });
        
        $("#opciones").html("");
        $(".nodoFondo").css("background-color", "#fff");
        $(".nodoBorde").css("border-width", "0px");
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
                if(response.length>0){
                    for(var i = 0; i < response.length; i++){
                        $("#opciones").append("<div class='card subtitle mt-3'><div data-idpadre='" + response[i].idNodo_Padre + "' data-log='" + response[i].historial + "' data-id='" + response[i].idNodo_Sig + "' data-idopcion='" + response[i].idOpcion + "' class='btn card-body opcion nodoBorde'>" + response[i].texto + "</div></div>")
                    }
                    setColors(330,"nodoFondo","nodoBorde");
                }else{
                    //$("#opciones").append("<div class='card subtitle mt-3' style='border-width: 3px; border-color: #000;'><div id='verFlujo' class='btn card-body'>Ver Flujo</div></div>")
                    $("#opciones").append("<div class='card subtitle mt-3' style='border-width: 3px; border-color: #000;'><div id='verEstandares' class='btn card-body'>Regresar a Estandares</div></div>")
                    setColors(330,"nodoFondo","nodoBorde");
                }
            },
            error: function (xhr) {

            }
        });
        
        $("#menu").hide();
        $("#content").show();
    }
    
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