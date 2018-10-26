$(document).ready(function () {

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

    $("#Gestion").on("click", function () {
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

    $('#nuevoArbol').on('click', () => {
        $('#modalNuevoArbol').modal('toggle')
    });

    $("#btn-nuevoArbol").on("click", function () {
        alert("Nuevo Arbol");
    });

    $("body").on("click", ".editarEstandar, .GoToNodo", function () {
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
                for (var i = 0; i < response.length; i++) {
                    var tipo;
                    if (response[i].raiz == 1) {
                        if (response[i].tipo == 1) tipo = "fas fa-star nodoEstrella";
                        else tipo = "fas fa-star nodoRoto nodoEstrella";
                    } else {
                        if (response[i].tipo == 1) tipo = "fas fa-shoe-prints";
                        else tipo = "fas fa-unlink nodoRoto";
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
        alert("Guardar Cambios Arbol");
    });

    $('#nuevoNodo').on('click', () => {
        $('#modalNewNode').modal('toggle')
    });

    $('#btn-nuevoNodo').on('click', () => {
        alert("RegistrarNuevo Nodo");
    });
    
    $("body").on("click", ".editarNodo", function () {
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
                        "<button class='btn btn-primary GoToNodo' data-id='" + response[i].idNodo_Sig + "'><i class='fas fa-arrow-right'></i></button><button class='btn btn-info editarOpcion' data-id='" + response[i].idOpcion + "'><i class='fas fa-edit'></i></button><button class='btn btn-danger eliminarOpcion' data-id='" + response[i].idOpcion + "'><i class='fas fa-trash-alt'></i></button>"
                    ]).draw(false);
                }
            },
            error: function (xhr) {

            }
        });   
        
        cambiar("contentNodo");
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
        $("#modalNewOptionLabel").html("Modificar Opcion");  
        $('#modalNewOption').modal('toggle')
    });
    
    
    //Raul

    $('#colorSelector').on('input', function () {
        var val = $('#colorSelector').val();
        $('#textColorEstandar').html("Color del estándar: Tono " + val);
        setColors(val, "sampleColorBackground", "sampleColorBorder");
    });

    $('#newOption').on('click', () => {
        $("#modalNewOptionLabel").html("Nueva Opcion");
        $('#modalNewOption').modal('toggle');
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

    encontrarEstrellaInit();
    function encontrarEstrella(iconButton) {
        $(iconButton).on('click', function () {
            swal({
                title: "Estás a punto de cambiar el nodo raiz:",
                text: "El nodo raiz previo será desvinculado",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((eliminar) => {
                if (eliminar) {

                    var x = document.getElementsByClassName('nodoEstrella');
                    var i;
                    for (i = 0; i < x.length; i++) {
                        $(x[i]).removeClass('fa-star');
                        $(x[i]).addClass('fa-unlink');
                        $(x[i]).removeClass('nodoEstrella');
                    }
                    if ($(iconButton).children().hasClass('fa-unlink'))
                        $(iconButton).children().removeClass('fa-unlink');
                    if ($(iconButton).children().hasClass('fa-shoe-prints'))
                        $(iconButton).children().removeClass('fa-shoe-prints');
                    $(iconButton).children().addClass('nodoEstrella');
                    $(iconButton).children().addClass('fa-star');

                } else {

                }
            });
        });
    }
    function encontrarEstrellaInit() {
        var x = document.getElementsByClassName("nodoTipo");
        var i;
        for (i = 0; i < x.length; i++) {
            encontrarEstrella(x[i]);
        }
    }
    selectNodoOpcionInit();
    function selectNodoOpcion(iconButton) {
        $(iconButton).on('click', function () {
            var x = document.getElementsByClassName('opcionSeleccionada');
            var i;
            for (i = 0; i < x.length; i++) {
                $(x[i]).removeClass('fas');
                $(x[i]).addClass('far');
                if ($(x[i]).parent().hasClass('btn-success'))
                    $(x[i]).parent().removeClass('btn-success');
                $(x[i]).removeClass('opcionSeleccionada');
            }
            if ($(iconButton).children().hasClass('far'))
                $(iconButton).children().removeClass('far');
            $(iconButton).children().addClass('opcionSeleccionada');
            $(iconButton).children().addClass('fas');
            $(iconButton).addClass('btn-success');

        });
    }
    
    function selectNodoOpcionInit() {
        var x = document.getElementsByClassName("nodosOpcion");
        var i;
        for (i = 0; i < x.length; i++) {
            selectNodoOpcion(x[i]);
        }
    }
    
    
    function mostrarContrasena(myButton,myField){
        myButton.on('mousedown', function () {
            var x = document.getElementById(myField);
            x.type = "text";
        });
        myButton.on('mouseup', function () {
            var x = document.getElementById(myField);
            x.type = "password";
        });
    }
    mostrarContrasena($('#mostrarContrasenaPrevia'),'contrasenaPrevia');
    mostrarContrasena($('#mostrarNuevaContrasena'),'nuevaContrasena');
    mostrarContrasena($('#mostrarVerificarContrasena'),'verificarContrasena');
    mostrarContrasena($('#mostrarContrasenaPreviaAdmin'),'contrasenaPreviaAdmin');
    mostrarContrasena($('#mostrarNuevaContrasenaAdmin'),'nuevaContrasenaAdmin');
    mostrarContrasena($('#mostrarVerificarContrasenaAdmin'),'verificarContrasenaAdmin');


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