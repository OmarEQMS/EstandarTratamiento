$(document).ready(function () {
    GetVisitas();
    $("#contentEstandares").hide();
    $("#contentEstandar").hide();
    $("#contentNodo").hide();
    $("#contentGestion").show();
    setColors(280, "myBackground", "myBorder");
    setColors(180, "sampleColorBackground", "sampleColorBorder");
    $('#change').on('click', () => {
        $('#menu, #content').toggleClass('active');
    });
    function cambiar(nombre) {
        $("#contentEstandares").hide();
        $("#contentEstandar").hide();
        $("#contentNodo").hide();
        $("#contentGestion").hide();
        $("#" + nombre).show();
    }

    $("#changePasswordGestion").on("click", function () {
        if ($("#nuevaContrasenaAdmin").val() != $("#verificarContrasenaAdmin").val()) {
            swal("Contraseñas diferentes", {icon: "error"});
            return;
        }

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "CambiarPassword",
                perfil: "visualizacion",
                pastPass: $("#contrasenaPreviaAdmin").val(),
                pass: $("#nuevaContrasenaAdmin").val()
            },
            success: function (response) {
                if (response = "success") {
                    swal("Contraseña Cambiada Exitosamente", {icon: "success"});
                } else {
                    swal("Hubo un error", {icon: "error"});
                }
            },
            error: function (xhr) {

            }
        });

        $("#contrasenaPreviaAdmin").val("");
        $("#nuevaContrasenaAdmin").val("");
        $("#verificarContrasenaAdmin").val("");
    });

    $("#changePasswordVisualizacion").on("click", function () {
        if ($("#nuevaContrasena").val() != $("#verificarContrasena").val()) {
            swal("Contraseñas diferentes", {icon: "error"});
            return;
        }

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "CambiarPassword",
                perfil: "visualizacion",
                pastPass: $("#contrasenaPrevia").val(),
                pass: $("#nuevaContrasena").val()
            },
            success: function (response) {
                if (response = "success") {
                    swal("Contraseña Cambiada Exitosamente", {icon: "success"});
                } else {
                    swal("Hubo un error", {icon: "error"});
                }
            },
            error: function (xhr) {

            }
        });

        $("#contrasenaPrevia").val("");
        $("#nuevaContrasena").val("");
        $("#verificarContrasena").val("");
    });

    function GetVisitas() {
        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "GetVisitas"
            },
            success: function (response) {
                $("#misVisitas").html("Visitas: " + response);
                $("#misVisitasMenu").html("<i class='far fa-eye'></i>Visitas: " + response);
            },
            error: function (xhr) {

            }
        });
    }

    $("#Gestion").on("click", function () {
        GetVisitas();
        cambiar("contentGestion");
    });
    $("#backEstandares").on("click", function () {
        cambiar("contentEstandares");
        CargarTablaEstandares();
    });
    $("#backEstandar").on("click", function () {
        cambiar("contentEstandar");
        var idE = $(this).data("id");
        CargarTablaNodos(idE);
    });

    $("#misAlgoritmos").on("click", function () {
        cambiar("contentEstandares");
        CargarTablaEstandares();
    });

    function CargarTablaEstandares() {
        tablaEstandares.clear().draw();
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetEstandares",
                estatus: 0
            },
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    tablaEstandares.row.add([response[i].nombre, "<button data-id='" + response[i].idEstandar + "' class='btn btn-info editarEstandar'><i class='fas fa-edit'></i></button><button data-id='" + response[i].idEstandar + "' class='btn btn-danger eliminarEstandar'><i class='fas fa-trash-alt'></i></button></td>"]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });
    }

    $('#nuevoArbol').on('click', function () {
        $("#tituloArbol").val("");
        $('#modalNuevoArbol').modal('toggle')
    });

    $("#btn-nuevoArbol").on("click", function () {
        var nombre = $("#tituloArbol").val();
        $('#modalNuevoArbol').modal('toggle')

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "NewEstandar",
                nombre: nombre
            },
            success: function (response) {
                swal("Estandar Agregado", {icon: "success"});
                tablaEstandares.row.add([nombre, "<button data-id='" + response + "' class='btn btn-info editarEstandar'><i class='fas fa-edit'></i></button><button data-id='" + response + "' class='btn btn-danger eliminarEstandar'><i class='fas fa-trash-alt'></i></button></td>"]).draw(false);
                EditarEstandar(response);
            },
            error: function (xhr) {

            }
        });
    });

    $("body").on("click", ".editarEstandar", function () {
        var idE = $(this).data("id");
        EditarEstandar(idE);
    });

    function EditarEstandar(idE) {
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
                $("#nombreEstandar").html(response.nombre);
                $("#tituloEstandar").val(response.nombre);
                $("#descripcionEstandar").val(response.descripcion);
                $("#colorSelector").val(response.color);
                $("#btn-nuevoNodo").data("id", response.idEstandar);
                var val = $('#colorSelector').val();
                $('#textColorEstandar').html("Color del estándar: Tono " + val);
                setColors(val, "sampleColorBackground", "sampleColorBorder");
                $('#estatusEstandar').prop('checked', (response.estatus == 1));
                $("#GuardarCambiosArbol").data("id", idE);
                $("#backEstandar").data("id", idE);
            },
            error: function (xhr) {

            }
        });
        CargarTablaNodos(idE);

        cambiar("contentEstandar");
    }

    function CargarTablaNodos(idE) {
        tablaNodos.clear().draw();
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetNodosPorEstandar",
                id: idE
            },
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var tipo;
                    if (response[i].raiz == 1) {
                        if (response[i].tipo == 1) {
                            tipo = "fas fa-star nodoEstrella";
                        } else {
                            tipo = "fas fa-star nodoRoto nodoEstrella";
                        }
                    } else {
                        if (response[i].tipo == 1) {
                            tipo = "fas fa-shoe-prints";
                        } else {
                            tipo = "fas fa-unlink nodoRoto";
                        }
                    }
                    tablaNodos.row.add([
                        "<button class='btn nodoTipo' data-id='" + response[i].idNodo + "'><i class='" + tipo + "'></i></button></td>",
                        response[i].titulo,
                        "<td><button class='btn btn-info editarNodo' data-id='" + response[i].idNodo + "'><i class='fas fa-edit'></i></button><button class='btn btn-danger eliminarNodo' data-id='" + response[i].idNodo + "'><i class='fas fa-trash-alt'></i></button></td>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });
    }

    $("body").on("click", ".eliminarEstandar", function () {
        var idE = $(this).data("id");
        var fila = $(this).parents('tr');

        swal({
            title: "¿Estas Seguro?",
            text: "Se eliminaran todos los nodo",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "GestionController",
                    method: "POST",
                    cache: false,
                    data: {
                        key: "EliminarEstandar",
                        id: idE
                    },
                    success: function (response) {
                        tablaEstandares.row(fila).remove().draw();
                        swal("Estandar Eliminado", {icon: "success"});
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });

    $("#GuardarCambiosArbol").on("click", function () {
        var idE = $(this).data("id");
        var nombre = $("#tituloEstandar").val();
        var descripcion = $("#descripcionEstandar").val();
        var color = $("#colorSelector").val();
        var estatus = ($('#estatusEstandar').prop('checked') == true) ? 1 : 0;

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "UpdateEstandar",
                id: idE,
                nombre: nombre,
                descripcion: descripcion,
                color: color,
                estatus: estatus
            },
            success: function (response) {
                $("#nombreEstandar").html($("#tituloEstandar").val());
                swal("Estandar Actualizado", {icon: "success"});
            },
            error: function (xhr) {

            }
        });

    });

    $('#nuevoNodo').on('click', function () {
        $("#tituloNuevoNodo").val("");
        $('#modalNewNode').modal('toggle');
    });

    $('#btn-nuevoNodo').on('click', function () {
        var idE = $(this).data("id");
        var tituloNodo = $("#tituloNuevoNodo").val();
        $('#modalNewNode').modal('toggle');

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "NewNodo",
                titulo: tituloNodo,
                idEstandar: idE
            },
            success: function (response) {
                swal("Nodo Agregado", {icon: "success"});
                tablaNodos.row.add([
                    "<button class='btn nodoTipo' data-id='" + response + "'><i class='fas fa-unlink nodoRoto'></i></button></td>",
                    tituloNodo,
                    "<td><button class='btn btn-info editarNodo' data-id='" + response + "'><i class='fas fa-edit'></i></button><button class='btn btn-danger eliminarNodo' data-id='" + response + "'><i class='fas fa-trash-alt'></i></button></td>"
                ]).draw(false);
                EditarNodo(response);
            },
            error: function (xhr) {

            }
        });
    });

    $("body").on("click", ".editarNodo, .GoToNodo", function () {
        var idN = $(this).data("id");
        EditarNodo(idN);
    });

    function EditarNodo(idN) {
        $("#ImagenNodo").attr("src", "./img/noImage.jpeg");

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
                $("#saveNodo").data("id", response[0].idNodo);
                $("#btn-nuevaOpcion").data("id", response[0].idNodo);
                $("#tituloNodo").val(response[0].titulo);
                $("#nombreNodo").html(response[0].titulo);
                $("#textoNodo").val(response[0].texto);
                $("#anotacionNodo").val(response[0].referencias);
                if (response[0].idImagen > 0) {
                    GetNodoImage(response[0].idImagen);
                } else {
                    $("#ImagenNodo").attr("src", "./img/noImage.jpeg");
                }
            },
            error: function (xhr) {

            }
        });
        
        CargarTablaOpciones(idN);

        cambiar("contentNodo");
    }

    function CargarTablaOpciones(idN) {
        tablaOpciones.clear().draw();
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
                for (var i = 0; i < response.length; i++) {
                    var nodoSig = "<button class='btn btn-primary GoToNodo' data-id='" + response[i].idNodo_Sig + "'><i class='fas fa-arrow-right'></i></button>";
                    if (response[i].idNodo_Sig == 0) {
                        nodoSig = "";
                    }
                    tablaOpciones.row.add([
                        response[i].texto,
                        nodoSig + "<button class='btn btn-info editarOpcion' data-id='" + response[i].idOpcion + "' data-nodo='" + response[i].idNodo_Padre + "' data-sig='" + response[i].idNodo_Sig + "'><i class='fas fa-edit'></i></button><button class='btn btn-danger eliminarOpcion' data-id='" + response[i].idOpcion + "'><i class='fas fa-trash-alt'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });
    }

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
                $("#ImagenNodo").attr("src", "data:image/png;base64," + response);
                if (response == "") {
                    $("#ImagenNodo").attr("src", "./img/noImage.jpeg");
                }
            },
            error: function (xhr) {

            }
        });
    }

    $("#saveNodo").on("click", function () {
        var idN = $(this).data("id");
        var tituloNodo = $("#tituloNodo").val();
        var textoNodo = $("#textoNodo").val();
        var anotacionNodo = $("#anotacionNodo").val();

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "UpdateNodo",
                id: idN,
                titulo: tituloNodo,
                texto: textoNodo,
                referencias: anotacionNodo
            },
            success: function (response) {
                $("#nombreNodo").html($("#tituloNodo").val());

                var data = new FormData();
                if ($("#ImagenNodo").attr("src") == "./img/noImage.jpeg") {
                    data.append("accionImagen", "quitar");
                } else if ($("#ImagenNodo").attr("src").includes("data:image/png;base64")) {
                    data.append("accionImagen", "nada");
                } else {
                    data.append("accionImagen", "modificar");
                    data.append("imagen", $("#imgNodo-input")[0].files[0]);
                }
                data.append("id", idN);
                data.append("key", "SubirImagen");

                $.ajax({
                    url: "GestionController",
                    method: "POST",
                    data: data,
                    encType: "multipart/form-data",
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        swal("Estandar Actualizada", {icon: "success"});
                    },
                    error: function () {
                    }
                });
                
            },
            error: function (xhr) {

            }
        });

    });

    $("body").on("click", ".eliminarNodo", function () {
        var idN = $(this).data("id");
        var fila = $(this).parents('tr');

        swal({
            title: "¿Estas Seguro?",
            text: "Se eliminaran el Nodo y sus opciones",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "GestionController",
                    method: "POST",
                    cache: false,
                    data: {
                        key: "EliminarNodo",
                        id: idN
                    },
                    success: function (response) {
                        tablaNodos.row(fila).remove().draw();
                        swal("Nodo Eliminado", {icon: "success"});
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });

    $("#quitarImagenNodo").on('click', function () {
        $("#ImagenNodo").attr("src", "./img/noImage.jpeg");
    });

    $("#imgNodo-input").on('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#ImagenNodo').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    $("body").on("click", ".eliminarOpcion", function () {
        var idO = $(this).data("id");
        var fila = $(this).parents('tr');

        swal({
            title: "¿Estas Seguro?",
            text: "Se eliminaran la Opcion",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "GestionController",
                    method: "POST",
                    cache: false,
                    data: {
                        key: "EliminarOpcion",
                        id: idO
                    },
                    success: function (response) {
                        tablaOpciones.row(fila).remove().draw();
                        swal("Opcion Eliminado", {icon: "success"});
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });

    $('#newOption').on('click', function () {
        $("#tituloNuevaOpcion").val("");
        $('#modalNewOption').modal('toggle');
    });

    $("#btn-nuevaOpcion").on("click", function () {
        var idN = $(this).data("id");
        var texto = $("#tituloNuevaOpcion").val();
        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "NewOpcion",
                idNodoPadre: idN,
                texto: texto
            },
            success: function (response) {
                tablaOpciones.row.add([
                    texto,
                    "<button class='btn btn-info editarOpcion' data-id='" + response + "' data-nodo='" + idN + "' data-sig='0'><i class='fas fa-edit'></i></button><button class='btn btn-danger eliminarOpcion' data-id='" + response + "'><i class='fas fa-trash-alt'></i></button>"
                ]).draw(false);
                swal("Opcion Agregada", {icon: "success"});
            },
            error: function (xhr) {

            }
        });

        $('#modalNewOption').modal('toggle');
    });

    $("body").on("click", ".editarOpcion", function () {
        $("#tituloOpcion").val("");
        $("#textoHistorial").val("");
        var idO = $(this).data("id");
        var idNS = $(this).data("sig");
        $("#btn-saveOpcion").data("id", idO);
        $("#btn-saveOpcion").data("nodo", $(this).data("nodo"));

        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetOpcion",
                id: idO
            },
            success: function (response) {
                $("#tituloOpcion").val(response.texto);
                $("#textoHistorial").val(response.historial);
            },
            error: function (xhr) {

            }
        });

        tablaNodosNuevaOpcion.clear().draw();
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetNodosPorOpcion",
                id: idO
            },
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var icono;
                    var icono2;
                    var color;
                    if (response[i].tipo == 1) {
                        icono2 = "fas fa-shoe-prints";
                    } else {
                        icono2 = "fas fa-unlink";
                    }
                    if (response[i].raiz == 1) {
                        icono2 = "fas fa-star";
                    }

                    if (idNS == response[i].idNodo) {
                        icono = "fas fa-check-circle opcionSeleccionada";
                        color = "btn-success "
                    } else {
                        icono = "far fa-check-circle";
                        color = "";
                    }

                    tablaNodosNuevaOpcion.row.add([
                        "<i class='" + icono2 + "'></i>&nbsp;" + response[i].titulo,
                        "<button class='btn " + color + "nodosOpcion' data-id='" + response[i].idNodo + "'><i class='" + icono + "'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });

        tablaNodosRaizNuevaOpcion.clear().draw();
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetNodosRaiz",
                id: idO
            },
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var icono;
                    var color;
                    if (idNS == response[i].idNodo) {
                        icono = "fas fa-check-circle opcionSeleccionada";
                        color = "btn-success "
                    } else {
                        icono = "far fa-check-circle";
                        color = "";
                    }

                    tablaNodosRaizNuevaOpcion.row.add([
                        "<i class='fas fa-star'></i>&nbsp;" + response[i].estandar,
                        "<button class='btn " + color + "nodosOpcion' data-id='" + response[i].idNodo + "'><i class='" + icono + "'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });

        $('#modalEditOption').modal('toggle');
    });

    $("#btn-saveOpcion").on("click", function () {
        var idN = $(this).data("nodo");
        var idO = $(this).data("id");
        var titulo = $("#tituloOpcion").val();
        var historial = $("#textoHistorial").val();
        var seleccionada = document.getElementsByClassName('opcionSeleccionada');
        var nodoSig = 0;
        for (var i = 0; i < seleccionada.length; i++) {
            nodoSig = $(seleccionada[0]).parent().data("id");
        }

        $.ajax({
            url: "GestionController",
            method: "POST",
            cache: false,
            data: {
                key: "UpdateOpcion",
                id: idO,
                texto: titulo,
                historial: historial,
                idNodo: nodoSig
            },
            success: function (response) {
                CargarTablaOpciones(idN);
                swal("Opcion cambiada Exitosamente", {icon: "success"});
            },
            error: function (xhr) {

            }
        });
        $('#modalEditOption').modal('toggle');

    });

    $('#colorSelector').on('input', function () {
        var val = $('#colorSelector').val();
        $('#textColorEstandar').html("Color del estándar: Tono " + val);
        setColors(val, "sampleColorBackground", "sampleColorBorder");
    });


    $("body").on('click', ".nodoTipo", function () {
        var idN = $(this).data("id");
        var este = this;

        swal({
            title: "Estás a punto de cambiar el nodo raiz:",
            text: "El nodo raiz previo será desvinculado",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((cambiar) => {
            if (cambiar) {

                $.ajax({
                    url: "GestionController",
                    method: "POST",
                    cache: false,
                    data: {
                        key: "ReferenciarEstandar",
                        id: idN
                    },
                    success: function (response) {
                        if (response = "success") {
                            swal("Nodo Raiz cambiado Exitosamente", {icon: "success"});

                            var estrellas = document.getElementsByClassName('nodoEstrella');
                            for (var i = 0; i < estrellas.length; i++) {
                                $(estrellas[i]).removeClass('fa-star');
                                if ($(estrellas[i]).hasClass('nodoRoto')) {
                                    $(estrellas[i]).addClass('fa-unlink');
                                } else {
                                    $(estrellas[i]).addClass('fa-shoe-prints');
                                }
                                $(estrellas[i]).removeClass('nodoEstrella');
                            }
                            if ($(este).children().hasClass('fa-unlink')) {
                                $(este).children().removeClass('fa-unlink');
                            }
                            if ($(este).children().hasClass('fa-shoe-prints')) {
                                $(este).children().removeClass('fa-shoe-prints');
                            }
                            $(este).children().addClass('nodoEstrella');
                            $(este).children().addClass('fa-star');

                        } else {
                            swal("Hubo un error", {icon: "error"});
                            return;
                        }
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });

    $("body").on('click', ".nodosOpcion", function () {
        var seleccionada = document.getElementsByClassName('opcionSeleccionada');
        for (var i = 0; i < seleccionada.length; i++) {
            $(seleccionada[i]).removeClass('fas');
            $(seleccionada[i]).addClass('far');
            if ($(seleccionada[i]).parent().hasClass('btn-success')) {
                $(seleccionada[i]).parent().removeClass('btn-success');
            }
            $(seleccionada[i]).removeClass('opcionSeleccionada');
        }
        if ($(this).children().hasClass('far')) {
            $(this).children().removeClass('far');
        }
        $(this).children().addClass('opcionSeleccionada');
        $(this).children().addClass('fas');
        $(this).addClass('btn-success');
    });


    function mostrarContrasena(myButton, myField) {
        myButton.on('mousedown', function () {
            var x = document.getElementById(myField);
            x.type = "text";
        });
        myButton.on('mouseup', function () {
            var x = document.getElementById(myField);
            x.type = "password";
        });
    }
    mostrarContrasena($('#mostrarContrasenaPrevia'), 'contrasenaPrevia');
    mostrarContrasena($('#mostrarNuevaContrasena'), 'nuevaContrasena');
    mostrarContrasena($('#mostrarVerificarContrasena'), 'verificarContrasena');
    mostrarContrasena($('#mostrarContrasenaPreviaAdmin'), 'contrasenaPreviaAdmin');
    mostrarContrasena($('#mostrarNuevaContrasenaAdmin'), 'nuevaContrasenaAdmin');
    mostrarContrasena($('#mostrarVerificarContrasenaAdmin'), 'verificarContrasenaAdmin');
    function tablaInit(tableName) {
        var tabla = $(tableName).DataTable({
            responsive: true,
            searching: true,
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                //"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
                //"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
                "sInfo": "",
                "sInfoEmpty": "",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {"sFirst": "Primero", "sLast": "Último", "sNext": "Siguiente", "sPrevious": "Anterior"},
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }});
        return tabla;
    }

    var tablaEstandares = tablaInit('#tablaEstandares');
    var tablaNodos = tablaInit('#tablaNodos');
    var tablaOpciones = tablaInit('#tablaOpciones');
    var tablaNodosNuevaOpcion = tablaInit('#tablaNodosNuevaOpcion');
    var tablaNodosRaizNuevaOpcion = tablaInit('#tablaNodosRaizNuevaOpcion');
});