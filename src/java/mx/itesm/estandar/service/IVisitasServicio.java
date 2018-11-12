package mx.itesm.estandar.service;
import mx.itesm.estandar.bean.Usuario;

/*
Interfaz de el Servicio de la Tabla Visitas
*/
public interface IVisitasServicio {
    
    /*
    nuevaVisita()
    no regresa nada
    no recibe nada
    */
    public void nuevaVisita();
    
    /*
    getVisitas()
    regresa el numero de visitas en el modulo de visualizacion
    no recibe nada
    */
    public int getVisitas();
}
