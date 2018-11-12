package mx.itesm.estandar.service;
import java.util.List;
import mx.itesm.estandar.bean.Nodo;

/*
Interfaz de el Servicio de la Tabla Nodo
*/
public interface INodoServicio {
    
    /*
    getNodo()
    regresa un objeto de tipo Nodo
    recibe in idNodo como referencia
    */
    public Nodo getNodo(int idNodo);
    
    /*
    getNodos()
    regresa una lista de objetos de tipo Nodo
    recibe un idEstandar como referencia
    */
    public List<Nodo> getNodos(int idEstandar);
    
    /*
    createNodo()
    regresa un numero entero correspondiente al ID de insercion del objeto en la tabla
    recibe un objeto de Tipo Nodo
    */
    public int createNodo(Nodo nodo);
    
    /*
    deleteNodo()
    regresa un booleano si la eliminacion fue exitosa
    recibe un idNodo como referencia
    */
    public boolean deleteNodo(int idNodo);
    
    /*
    updateNodo()
    regresa un booleano si la actualizacion fue exitosa
    recibe un objeto de tipo Nodo
    */
    public boolean updateNodo(Nodo nodo);
}
