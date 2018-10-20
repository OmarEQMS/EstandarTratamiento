function setBorder(hueValue,className){
    var x = document.getElementsByClassName(className);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderStyle = "solid";
        x[i].style.borderColor = "hsl(" + hueValue +",100%,45%)";
        /*
        OTRAS OPCIONES
        H = 55%, H = 65%, H = 70%
        
        Sin embargo dejo H = 45% porque
        el borde sigue siendo una sombra y el fondo un tinte.
       	De las otras formas ambos son tintes.
        */
        x[i].style.borderWidth = "3px";
        x[i].style.backgroundColor = "#ffffff";
        x[i].style.color = "#550093";
    }
}
function setBackground(hueValue,className){
    var x = document.getElementsByClassName(className);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "hsl(" + hueValue +",100%,96%)";
        x[i].style.color = "#550093";
    }
}
function setColors(hue,backgroundClass,borderClass){
	setBackground(hue,backgroundClass);
	setBorder(hue,borderClass);
}