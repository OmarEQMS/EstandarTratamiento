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
        if ($("#nuevaContrasenaAdmin").val()!=$("#verificarContrasenaAdmin").val()) {
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
        if ($("#nuevaContrasena").val()!=$("#verificarContrasena").val()) {
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
    
    function GetVisitas(){
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
    });
    $("#backEstandar").on("click", function () {
        cambiar("contentEstandar");
    });
    $("#misAlgoritmos").on("click", function () {
        cambiar("contentEstandares");
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
    });

    $('#nuevoArbol').on('click', function() {
        $("#tituloArbol").val("");
        $('#modalNuevoArbol').modal('toggle')
    });

    $("#btn-nuevoArbol").on("click", function () {
        alert("Nuevo Arbol");
    });

    $("body").on("click", ".editarEstandar", function () {
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
                $("#nombreEstandar").html(response.nombre);
                $("#tituloEstandar").val(response.nombre);
                $("#descripcionEstandar").val(response.descripcion);
                $("#colorSelector").val(response.color);
                var val = $('#colorSelector').val();
                $('#textColorEstandar').html("Color del estándar: Tono " + val);
                setColors(val, "sampleColorBackground", "sampleColorBorder");
                $('#estatusEstandar').prop('checked', (response.estatus == 1));
            },
            error: function (xhr) {

            }
        });
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
                $("#GuardarCambiosArbol").data("id", idE);
                
                for (var i = 0; i < response.length; i++) {
                    var tipo;
                    if (response[i].raiz == 1) {
                        if (response[i].tipo == 1)
                            tipo = "fas fa-star nodoEstrella";
                        else
                            tipo = "fas fa-star nodoRoto nodoEstrella";
                    } else {
                        if (response[i].tipo == 1)
                            tipo = "fas fa-shoe-prints";
                        else
                            tipo = "fas fa-unlink nodoRoto";
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
        cambiar("contentEstandar");
    });

    $("body").on("click", ".eliminarEstandar", function () {
        var idE = $(this).data("id");
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
                    dataType: "JSON",
                    data: {
                        key: "EliminarEstandar",
                        id: idE
                    },
                    success: function (response) {
                        swal("Estandar Eliminado", {icon: "success"});
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });
    $("#GuardarCambiosArbol").on("click", function () {
        alert($(this).data("id"));
        alert("Guardar Cambios Arbol");
    });

    $('#nuevoNodo').on('click', function() {
        $("#tituloNuevoNodo").val("");
        $('#modalNewNode').modal('toggle');
    });

    $('#btn-nuevoNodo').on('click', function() {
        alert("RegistrarNuevo Nodo");
    });

    $("body").on("click", ".editarNodo, .GoToNodo", function () {
        var idN = $(this).data("id");
        tablaOpciones.clear().draw();
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
                $("#newOption").data("id", response[0].idNodo);
                $("#tituloNodo").val(response[0].titulo);
                $("#nombreNodo").html(response[0].titulo);
                $("#textoNodo").html(response[0].texto);
                $("#anotacionNodo").html(response[0].referencias);
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
                for (var i = 0; i < response.length; i++) {
                    tablaOpciones.row.add([
                        response[i].texto,
                        "<button class='btn btn-primary GoToNodo' data-id='" + response[i].idNodo_Sig + "'><i class='fas fa-arrow-right'></i></button><button class='btn btn-info editarOpcion' data-id='" + response[i].idOpcion + "' data-sig='" + response[i].idNodo_Sig + "'><i class='fas fa-edit'></i></button><button class='btn btn-danger eliminarOpcion' data-id='" + response[i].idOpcion + "'><i class='fas fa-trash-alt'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });
        cambiar("contentNodo");
    });

    $("#saveNodo").on("click", function () {
        alert($(this).data("id"));
        alert("Guardar Nodo");
    });

    $("body").on("click", ".eliminarNodo", function () {
        var idN = $(this).data("id");
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
                    dataType: "JSON",
                    data: {
                        key: "EliminarNodo",
                        id: idN
                    },
                    success: function (response) {
                        swal("Nodo Eliminado", {icon: "success"});
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });

    $("body").on("click", ".eliminarOpcion", function () {
        var idO = $(this).data("id");
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
                    dataType: "JSON",
                    data: {
                        key: "EliminarOpcion",
                        id: idO
                    },
                    success: function (response) {
                        swal("Opcion Eliminado", {icon: "success"});
                    },
                    error: function (xhr) {

                    }
                });
            }
        });
    });

    $("body").on("click", ".editarOpcion", function () {
        $("#tituloOpcion").val("");
        $("#textoHistorial").val("");
        $("#modalNewOptionLabel").html("Modificar Opcion");
        $("#btn-saveOpcion").html("Guardar");
        var idO = $(this).data("id");
        var idNS = $(this).data("sig");
        $("#btn-saveOpcion").data("id", idO);

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
                        "<button class='btn " + color + "nodosOpcion'><i class='" + icono + "'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });

        $('#modalNewOption').modal('toggle');
    });

    $('#newOption').on('click', function () {
        $("#tituloOpcion").val("");
        $("#textoHistorial").val("");
        $("#modalNewOptionLabel").html("Nueva Opcion");
        $("#btn-saveOpcion").html("Registrar");
        idN = $(this).data("id");
        $("#btn-saveOpcion").data("id", 0);

        tablaNodosNuevaOpcion.clear().draw();
        $.ajax({
            url: "VisualizacionController",
            method: "POST",
            cache: false,
            dataType: "JSON",
            data: {
                key: "GetNodosPorNodo",
                id: idN
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

                    tablaNodosNuevaOpcion.row.add([
                        "<i class='" + icono2 + "'></i>&nbsp;" + response[i].titulo,
                        "<button class='btn " + color + "nodosOpcion'><i class='" + icono + "'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });

        $('#modalNewOption').modal('toggle');
    });

    $("#btn-saveOpcion").on("click", function () {
        alert("Nueva Opcion");
        alert($(this).data("id"));
    });

    //Raul

    $('#colorSelector').on('input', function () {
        var val = $('#colorSelector').val();
        $('#textColorEstandar').html("Color del estándar: Tono " + val);
        setColors(val, "sampleColorBackground", "sampleColorBorder");
    });

    //RAUL

    $("#file-input").on('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#ImagenNodo').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("body").on('click', ".nodoTipo", function () {
        swal({
            title: "Estás a punto de cambiar el nodo raiz:",
            text: "El nodo raiz previo será desvinculado",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((cambiar) => {
            if (cambiar) {
                var x = document.getElementsByClassName('nodoEstrella');
                for (var i = 0; i < x.length; i++) {
                    $(x[i]).removeClass('fa-star');
                    if ($(this).children().hasClass('nodoRoto'))
                        $(x[i]).addClass('fa-unlink');
                    else
                        $(this).children().removeClass('fa-shoe-prints');
                    $(x[i]).removeClass('nodoEstrella');
                }
                if ($(this).children().hasClass('fa-unlink'))
                    $(this).children().removeClass('fa-unlink');
                if ($(this).children().hasClass('fa-shoe-prints'))
                    $(this).children().removeClass('fa-shoe-prints');
                $(this).children().addClass('nodoEstrella');
                $(this).children().addClass('fa-star');
            } else {

            }
        });
    });
    $("body").on('click', ".nodosOpcion", function () {
        var x = document.getElementsByClassName('opcionSeleccionada');
        for (var i = 0; i < x.length; i++) {
            $(x[i]).removeClass('fas');
            $(x[i]).addClass('far');
            if ($(x[i]).parent().hasClass('btn-success'))
                $(x[i]).parent().removeClass('btn-success');
            $(x[i]).removeClass('opcionSeleccionada');
        }
        if ($(this).children().hasClass('far'))
            $(this).children().removeClass('far');
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