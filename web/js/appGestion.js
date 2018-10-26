$(document).ready(function () {

    $("#contentEstandares").hide();
    $("#contentEstandar").hide();
    $("#contentNodo").hide();    
    setColors(280,"myBackground","myBorder");
    setColors(180,"sampleColorBackground","sampleColorBorder");
    
    $('#change').on('click', () => {
        $('#menu, #content').toggleClass('active');
    });


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

    $("#file-input").on('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {$('#ImagenNodo').attr('src', e.target.result);}
            reader.readAsDataURL(this.files[0]);
        }
    });
  
    encontrarEstrellaInit();
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
    selectNodoOpcionInit();
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
    

    function tablaInit(tableName){
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
            "oPaginate": {"sFirst": "Primero","sLast": "Último","sNext": "Siguiente","sPrevious": "Anterior"},
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