$(document).ready(function () {

    $('#change').on('click', () => {
        $('#menu, #content').toggleClass('active');
    });

    setColors(280,"myBackground","myBorder");
    setColors(180,"sampleColorBackground","sampleColorBorder");

	$('#colorSelector').on('input', function () {
		var val = $('#colorSelector').val();
		$('#sampleColorText').html("Color del estándar: Tono " + val);
		setColors(val,"sampleColorBackground","sampleColorBorder");
	});

	$('#newOption').on('click', () => {
        $('#modalNewOption').modal('toggle')
    });
    $('#nuevoNodo').on('click', () => {
        $('#modalNewNode').modal('toggle')
    });
    $('#nuevoArbol').on('click', () => {
        $('#modalNuevoArbol').modal('toggle')
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#ImagenPerfil').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file-input").on('change', function () {
        readURL(this);
    });

    function tablaInit(tabla){
	$('#tablaEstandares').DataTable({
        responsive: true,
        searching: true,
        dom: 'lBfrtip',
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del START al END de un total de TOTAL",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
            "sInfoFiltered": "(filtrado de un total de MAX registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }

        }
    });
	}

    //tablaInit($('#tablaEstandares'));
    //tablaInit($('#tablaNuevaOpcion'));
    //tablaInit($('#tablaNodos'));
    //tablaInit($('#tablaOpciones'));
    //tablaInit($('#tablaRaicesOpciones'));

    function encontrarEstrella(iconButton){
        $(iconButton).on('click', function () {

            swal({
                title: "Estás a punto de cambiar el nodo raiz:",
                text: "El nodo raiz previo será desvinculado",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((eliminar) => {
                if (eliminar) {

                    var x = document.getElementsByClassName('nodoEstrella');
                    var i;
                    for (i = 0; i < x.length; i++) {
                        $(x[i]).removeClass('fa-star');
                        $(x[i]).addClass('fa-unlink');
                        $(x[i]).removeClass('nodoEstrella');
                    }
                    if ($(iconButton).children().hasClass('fa-unlink'))$(iconButton).children().removeClass('fa-unlink');
                    if ($(iconButton).children().hasClass('fa-shoe-prints'))$(iconButton).children().removeClass('fa-shoe-prints');
                    $(iconButton).children().addClass('nodoEstrella');
                    $(iconButton).children().addClass('fa-star');

                } else {

                }
            });
        });
    }

    function encontrarEstrellaInit(){
        var x = document.getElementsByClassName("toggleButton");
        var i;
        for (i = 0; i < x.length; i++) {
            encontrarEstrella(x[i]);
        }
    }
    encontrarEstrellaInit();

    function selectNodoOpcion(iconButton){
        $(iconButton).on('click', function () {
            var x = document.getElementsByClassName('opcionSeleccionada');
            var i;
            for (i = 0; i < x.length; i++) {
                $(x[i]).removeClass('fas');
                $(x[i]).addClass('far');
                if ($(x[i]).parent().hasClass('btn-success'))$(x[i]).parent().removeClass('btn-success');
                $(x[i]).removeClass('opcionSeleccionada');
            }
            if ($(iconButton).children().hasClass('far'))$(iconButton).children().removeClass('far');
            $(iconButton).children().addClass('opcionSeleccionada');
            $(iconButton).children().addClass('fas');
           $(iconButton).addClass('btn-success');

        });
    }

    function selectNodoOpcionInit(){
        var x = document.getElementsByClassName("nodosOpcion");
        var i;
        for (i = 0; i < x.length; i++) {
            selectNodoOpcion(x[i]);
        }
    }
    selectNodoOpcionInit();
    
    $('#tablaEstandares').DataTable({
        responsive: true,
        searching: true,
        dom: 'lBfrtip',
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del START al END de un total de TOTAL",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
            "sInfoFiltered": "(filtrado de un total de MAX registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }

        }
    });
    
});