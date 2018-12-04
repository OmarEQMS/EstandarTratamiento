$(document).ready(function () {
    //Inicio
    var idEstandarActual = 0;
    var historial = [];
    $("#content").hide();
    $("#divHistorial").hide();
    $("#menu").show();
    $("#imgNodo").hide();
    GetHistorial();
    if (historial.length != 0) {
        CargarHistorial(0);
    }
    var tablaHistorial = $('#tablaHistorial').DataTable({
        responsive: false,
        searching: false,
        "paging": false,
        "ordering": false,
        dom: 'lBfrtip',
        buttons: [{extend: 'pdf', text: 'Exportar a PDF', className: 'btn-outline-info mr-3 btnPDF mt-3'}],
        "language": {
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sLoadingRecords": "Cargando...",
            "sInfo": "",
            "sInfoEmpty": ""
        }
    });

    CargarEstandares();

    //Cargar Estandares    
    function CargarEstandares() {
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
                for (var i = 0; i < response.length; i++) {
                    $("#estandares").append("<div class='card mt-3'><div class='btn card-body algoritmosBorde'><div class='row'><div data-id='" + response[i].idNodo + "' data-estandar='" + response[i].idEstandar + "' class='estandar col-10'><span class='subtitle'>" + response[i].nombre + "</span></div><div class='col-2 col-sm-1 d-flex'><i data-id='" + response[i].idEstandar + "' class='ml-auto infoEstandar fas fa-info-circle icono-info' title='Descripcion' style='font-size:27px' data-placement='top'> </i></div></div></div></div>")
                }
                setColors(270, "algoritmosFondo", "algoritmosBorde");
                setColors(270, "nodoFondo", "nodoBorde");

                ResizingScroll();
            },
            error: function (xhr) {

            }
        });
    }

    //Cargar Historial
    function CargarHistorial(index) {
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetOpcion",
                id: historial[index]
            },
            success: function (response) {
                if (response.historial != "") {
                    $(".historialDecisiones").html("<div data-id='" + response.idNodo_Padre + "' class='card btn historialDecisionesBoton'><button class='btn'><i class='fas fa-chevron-left'></i></button>&nbsp;<span class='subtitle'>" + response.historial + "</span>&nbsp;</div>" + $(".historialDecisiones").html());
                }
                if (index == historial.length - 1) {
                    CargarNodo(response.idNodo_Sig);
                } else {
                    CargarHistorial(index + 1);
                }
            },
            error: function (xhr) {

            }
        });
    }

    //Cargar Historial
    function CargarHistorialTabla(index) {
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetOpcion",
                id: historial[index]
            },
            success: function (response) {
                if (response.historial != "") {
                    tablaHistorial.row.add([response.historial]).draw(false);
                }
                if (index != historial.length - 1) {
                    $(".historialDecisiones").html("");
                    CargarHistorialTabla(index + 1);
                }
            },
            error: function (xhr) {

            }
        });
    }

    //Cambio de Pantalla
    $(".change").on("click", function () {
        $("#menu").hide();
        $("#content").hide();
        $("#divHistorial").hide();
        $("#" + $(this).data("id")).show();
        ResizingScroll();
    });

    //Regresar a Estandares
    $("body").on("click", "#verEstandares", function () {
        $("#menu").show();
        $("#content").hide();
        $("#divHistorial").hide();
        ResizingScroll();
    });

    //Imprimir el Flujo
    $("body").on("click", "#verFlujo, #btnVerFlujo", function () {
        $("#menu").hide();
        $("#content").hide();
        $("#divHistorial").show();
        tablaHistorial.clear().draw();
        CargarHistorialTabla(0);
    });

    $("body").on("click", "#btnVerFlujo", function () {
        $("#regresarArbol").data("id", "menu");
    });
    $("body").on("click", "#verFlujo", function () {
        $("#regresarArbol").data("id", "content");
    });


    //Click en Boton Historial
    $("body").on("click", ".historialDecisionesBoton", function () {
        var idN = $(this).data("id");
        var actual = this
        var bool = true;
        $('.historialDecisiones').children().each(function () {
            if (bool == true) {
                this.remove();
                historial.pop();
            }
            if (actual == this) {
                bool = false;
            }
        });
        CargarNodo(idN);
        SaveHistorial();
    });

    //Clic en un Estandar
    $("body").on("click", ".estandar", function () {
        $("#nombreEstandar").html($(this).html());
        idEstandarActual = $(this).data("estandar");
        var idN = $(this).data("id");
        BorrarHistorial_CargarNodo_Estandar(idN);
    });

    function BorrarHistorial_CargarNodo_Estandar(idN) {
        if (historial.length != 0) {
            swal("¿Quieres guardar tu Historial?", {
                buttons: {
                    decline: "No",
                    accept: "Si"
                },
            }).then(function (value) {
                if (value == "decline") {
                    DeleteHistorial();
                    $(".historialDecisiones").html("");
                }
                $("#menu").hide();
                $("#divHistorial").hide();
                $("#content").show();
                CargarNodo(idN);
                SaveHistorial();
            });
        } else {
            $("#menu").hide();
            $("#divHistorial").hide();
            $("#content").show();
            CargarNodo(idN);
        }
    }
    
    function BorrarHistorial_CargarNodo_Opcion(idN) {
        if (historial.length != 0) {
            swal("Estas a punto de ingresar a un nuevo Algoritmo ¿Quieres guardar tu Historial?", {
                buttons: {
                    cancelar: "Cancelar",
                    decline: "No",
                    accept: "Si"
                },
            }).then(function (value) {
                if (value == "decline") {
                    DeleteHistorial();
                    $(".historialDecisiones").html("");
                }
                if(value != "cancelar"){
                    $("#menu").hide();
                    $("#divHistorial").hide();
                    $("#content").show();
                    CargarNodo(idN);
                    SaveHistorial();
                }
            });
        } else {
            $("#menu").hide();
            $("#divHistorial").hide();
            $("#content").show();
            CargarNodo(idN);
        }
    }

    //Clic en una Opcion
    $("body").on("click", ".opcion", function () {
        if ($(this).data("log") != "") {
            $(".historialDecisiones").html("<div data-id='" + $(this).data("idpadre") + "' class='card btn historialDecisionesBoton'><button class='btn'><i class='fas fa-chevron-left'></i></button>&nbsp;" + $(this).data("log") + "&nbsp;</div>" + $(".historialDecisiones").html());
        }
        historial.push($(this).data("idopcion").toString());
        var idN = $(this).data("id");
        var idE_Sig = $(this).data("estandar");        
        
        if ((idE_Sig != idEstandarActual) && (idE_Sig != 0)) {
            BorrarHistorial_CargarNodo_Opcion(idN);
        } else {
            CargarNodo(idN);
        }
        SaveHistorial();
    });

    //Cargar Nodo
    function CargarNodo(idN) {
        $("#opciones").html("");
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
                idEstandarActual = response[0].idEstandar;
                $("#nombreEstandar").html(response[1].nombreEstandar);
                $("#exampleModalLabel").html("Referencias");
                if (response[0].referencias != "") {
                    $("#referencias").html(response[0].referencias);
                } else {
                    $("#referencias").html("Sin Referencias");
                }
                $("#referencias").html($("#referencias").html().replace(/[\012]/g, "<br>"));
                $("#nodo").html(response[0].texto);
                $("#nodo").html($("#nodo").html().replace(/[\012]/g, "<br>"));
                OpcionesNodo(idN, response[1].color);
                if (response[0].idImagen > 0) {
                    GetNodoImage(response[0].idImagen);
                } else {
                    $("#imgNodo").hide();
                }
            },
            error: function (xhr) {

            }
        });
    }

    //Cargar Opciones del Nodo
    function OpcionesNodo(idN, color) {
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
                $("#opciones").html("");
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        var raiz = "<i class='fas fa-star'></i>&nbsp;";
                        if ((response[i].estandar == idEstandarActual) || (response[i].estandar == 0)) {
                            raiz = "";
                        }
                        $("#opciones").append("<div class='card mt-2'><div data-estandar='" + response[i].estandar + "' data-idpadre='" + response[i].idNodo_Padre + "' data-log='" + response[i].historial + "' data-id='" + response[i].idNodo_Sig + "' data-idopcion='" + response[i].idOpcion + "' class='btn card-body opcion nodoBorde p-2'><span class='subtitle'>" + raiz + response[i].texto + "</span></div></div>")
                    }
                    setColors(color, "nodoFondo", "nodoBorde");
                } else {
                    $("#opciones").append("<div class='card mt-2' style='border-width: 3px; border-color: #4b32a1;'><div id='verFlujo' class='btn card-body p-2'><i class='fas fa-code-branch'></i>&nbsp;<span class='subtitle'>Ver Flujo</span></div></div>")
                    $("#opciones").append("<div class='card mt-2' style='border-width: 3px; border-color: #4b32a1;'><div id='verEstandares' class='btn card-body p-2'><i class='fas fa-home'></i>&nbsp;<span class='subtitle'>Regresar a Algoritmos</span></div></div>")
                    setColors(color, "nodoFondo", "nodoBorde");
                }
                ResizingScroll();
            },
            error: function (xhr) {

            }
        });
    }

    //Obtener Imagen
    function GetNodoImage(idIMG) {
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
                if (response != "") {
                    $("#imgNodo").show();
                } else {
                    $("#imgNodo").hide();
                }
            },
            error: function (xhr) {

            }
        });
    }


    //Cargar Descripcion
    $("body").on("click", ".infoEstandar", function () {
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
                if (response.descripcion != "") {
                    $("#referencias").html(response.descripcion);
                } else {
                    $("#referencias").html("Sin Descripcion");
                }
                $("#referencias").html($("#referencias").html().replace(/[\012]/g, "<br>"));
                $("#modalReferencias").modal('toggle');
            },
            error: function (xhr) {

            }
        });
    });

    //Mostrar Referencias
    $("#mostrarReferencias").on("click", function () {
        $("#modalReferencias").modal('toggle');
    });



    //COOKIES
    function SaveHistorial() {
        var json_str = JSON.stringify(historial);
        createCookie('EstandarTratamiento', json_str);
    }
    function GetHistorial() {
        var json_str = getCookie('EstandarTratamiento');
        if (json_str != "") {
            historial = JSON.parse(json_str);
        }
    }
    function DeleteHistorial() {
        historial = [];
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


    $("#SignOut").on("click", function () {
        $.postGo("Estandar", {
            salir: "salir"
        });
    });

    function ResizingScroll() {
        $("#scrollPageEstandares").css('top', $("#stickyTopEstandares").outerHeight(true) + "px");
        $("#scrollPageNodos").css('top', $("#stickyTopNodos").outerHeight(true) + "px");
    }
    ;

});