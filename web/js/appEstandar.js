$(document).ready(function () {    
    //Inicio
    $("#content").hide();    
    $("#imgNodo").hide();
    CargarEstandares();
    CargarHistorial();
   
    //Cargar Estandares    
    function CargarEstandares(){
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetEstandares",
                estatus: 1
            },
            success: function (response) {
                $("#estandares").html("");
                for(var i = 0; i < response.length; i++){
                    $("#estandares").append("<div class='card mt-3'><div class='btn card-body algoritmosBorde'><div class='row'><div data-id='" + response[i].idNodo + "' class='estandar col-10'><span>" + response[i].nombre + "</span></div><div class='col-2 col-sm-1 d-flex'><i data-id='" + response[i].idEstandar + "' class='ml-auto infoEstandar fas fa-info-circle icono-info' style='font-size:27px' data-placement='top'> </i></div></div></div></div>")
                }
                setColors(270,"algoritmosFondo","algoritmosBorde");
                setColors(270,"nodoFondo","nodoBorde");  
            },
            error: function (xhr) {

            }
        });
    }

    //Cargar Historial
    function CargarHistorial(){
        
    }
    
    
    //Cambio de Pantalla
    $(".change").on("click", function () {
        $("#menu").hide();
        $("#content").hide();
        $("#" + $(this).data("id")).show();
    });

    //Regresar a Estandares
    $("body").on("click", "#verEstandares", function(){
        $("#menu").show();
        $("#content").hide();
    }); 
    
    //Imprimir el Flujo
    $("body").on("click", "#verFlujo", function(){
                
    }); 
    
    
    //Clic en un Estandar
    $("body").on("click", ".estandar", function(){
        $("#nombreEstandar").html($(this).html());
        $(".historialDecisiones").html("");
        //BORRAR HISTORIAL
    });
    
    //Clic en una Opcion
    $("body").on("click", ".opcion", function(){
        if($(this).data("log")!=""){
            $(".historialDecisiones").html("<div data-id='" + $(this).data("idpadre") + "' class='card btn historialDecisionesBoton'><button class='btn'><i class='fas fa-chevron-left'></i></button>&nbsp;" + $(this).data("log") + "&nbsp;</div>" + $(".historialDecisiones").html());
        }        
        //AGREGAR HISTORIAL - $(this).data("idopcion")
    });
    
    //Click en Boton Historial
    $("body").on("click", ".historialDecisionesBoton", function(){
        var idN = $(this).data("id");
        var actual = this
        var bool = true;
        $('.historialDecisiones').children().each(function () {
            if(bool==true){this.remove();}
            if(actual==this){bool = false;}
        });
        //BORRAR HISTORIAL
        CargarNodo(idN); 
    });    

    //Click en Estandar o en Opcion para cargar Nodo
    $("body").on("click", ".estandar, .opcion", function(){
        var idN = $(this).data("id");        
        CargarNodo(idN);        
    });
    
    //Cargar Nodo
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
                CargarColor(idN);
                if(response.idImagen!=0){GetNodoImage(response.idImagen);}else{$("#imgNodo").hide();} 
            },
            error: function (xhr) {

            }
        });
    }
    
    //Cargar Color
    function CargarColor(idN){
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetColor",
                id: idN
            },
            success: function (response) {    
                var color = response;
                OpcionesNodo(idN, color);
            },
            error: function (xhr) {

            }
        });
    }
    
    //Cargar Opciones del Nodo
    function OpcionesNodo(idN, color){        
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
                    setColors(color,"nodoFondo","nodoBorde");                   
                }else{
                    $("#opciones").append("<div class='card subtitle mt-3' style='border-width: 3px; border-color: #000;'><div id='verFlujo' class='btn card-body'>Ver Flujo</div></div>")
                    $("#opciones").append("<div class='card subtitle mt-3' style='border-width: 3px; border-color: #000;'><div id='verEstandares' class='btn card-body'>Regresar a Estandares</div></div>")
                    setColors(color,"nodoFondo","nodoBorde");
                }
                $("#menu").hide();
                $("#content").show();
            },
            error: function (xhr) {

            }
        });
    }
        
    //Obtener Imagen
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
    
    
    //Cargar Descripcion
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
    
    //Mostrar Referencias
    $("#mostrarReferencias").on("click", function(){
        $("#modalReferencias").modal('toggle');
    });
});