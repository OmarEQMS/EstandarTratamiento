$(document).ready(function () {    
    //Inicio
    var historial = [];
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
        GetHistorial();
        for(var i = 0; i < historial.length; i++){
            $.ajax({
                url: "VisualizacionController",
                method: "POST",
                cache: false,
                dataType: "JSON",
                data: {
                    key: "GetOpcion",
                    id: historial[i]
                },
                success: function (response) {                
                    if(response.historial!=""){
                        $(".historialDecisiones").html("<div data-id='" + response.idNodo_Padre + "' class='card btn historialDecisionesBoton'><button class='btn'><i class='fas fa-chevron-left'></i></button>&nbsp;" + response.historial + "&nbsp;</div>" + $(".historialDecisiones").html());
                    }
                },
                error: function (xhr) {

                }
            });
        }
    }
    
    
    //Cambio de Pantalla
    $(".change").on("click", function () {
        $("#menu").hide();
        $("#content").hide();
        $("#" + $(this).data("id")).show();
        SaveHistorial();
    });

    //Regresar a Estandares
    $("body").on("click", "#verEstandares", function(){        
        $("#menu").show();
        $("#content").hide();
        SaveHistorial();
    }); 
    
    //Imprimir el Flujo
    $("body").on("click", "#verFlujo", function(){
        SaveHistorial();
    }); 
    
    //Click en Boton Historial
    $("body").on("click", ".historialDecisionesBoton", function(){
        var idN = $(this).data("id");
        var actual = this
        var bool = true;
        $('.historialDecisiones').children().each(function () {
            if(bool==true){this.remove(); historial.pop();}
            if(actual==this){bool = false;}
        });
        
        CargarNodo(idN); 
    });    
    
    //Clic en un Estandar
    $("body").on("click", ".estandar", function(){
        $("#nombreEstandar").html($(this).html());
        
        if(historial.length!=0){
            swal("¿Quieres guardar tu Historial?", {
            buttons: {
              cancel: "No",
              accept: "Si"
            },
            }).then((value) => {
                if(value=="cancel"){
                    DeleteHistorial();
                    $(".historialDecisiones").html("");
                }
                SaveHistorial();
                var idN = $(this).data("id");        
                CargarNodo(idN);  
            });
        }else{
            var idN = $(this).data("id");        
            CargarNodo(idN); 
        }
    });
    
    //Clic en una Opcion
    $("body").on("click", ".opcion", function(){
        if($(this).data("log")!=""){
            $(".historialDecisiones").html("<div data-id='" + $(this).data("idpadre") + "' class='card btn historialDecisionesBoton'><button class='btn'><i class='fas fa-chevron-left'></i></button>&nbsp;" + $(this).data("log") + "&nbsp;</div>" + $(".historialDecisiones").html());
        }        
        historial.push($(this).data("idopcion").toString());
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
    
    
    
    //COOKIES
    function SaveHistorial(){
        var json_str = JSON.stringify(historial);
        createCookie('EstandarTratamiento', json_str);
    }
    function GetHistorial(){
        var json_str = getCookie('EstandarTratamiento');
        if(json_str!=""){
            historial = JSON.parse(json_str);
        }
    }
    function DeleteHistorial(){        
        historial = [];
    }    
    
    var createCookie = function(name, value, days) {       
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
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