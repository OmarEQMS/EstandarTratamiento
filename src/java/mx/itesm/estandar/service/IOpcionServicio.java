package mx.itesm.estandar.service;
import java.util.List;
import mx.itesm.estandar.bean.Opcion;

/*
Interfaz de el Servicio de la Tabla Opcion
*/
public interface IOpcionServicio {
    
    /*
    getOpcion()
    regresa un objeto de tipo opcion
    recibe un idOpcion como referencias
    */
    public Opcion getOpcion(int idOpcion);
    
    /*
    getOpciones()
    regresa una lista de objetos de tipo opcion
    recibe un idNodo como referencia
    */
    public List<Opcion> getOpciones(int idNodo);
    
    /*
    getNodoEnOpciones()
    regresa un booleano si un Nodo puede ser accedido al darle click a una opcion (esta dentro del flujo)
    recibe un idNodo como referencia
    */
    public boolean getNodoEnOpciones(int idNodo);
    
    /*
    updateOpcionesPorSig()
    regresa un booleano si la actualizacion fue exitosa
    recibe como referencia el viejo idNodo y el nuevo(0) idNodo
    Cuando es elimina un nodo que era siguiente de una opcion, el campo idNodo deberia de tener 0 para denotar que la opcion no tiene vinculo
    */
    public boolean updateOpcionesPorSig(int idNodoSigPast, int idNodoSig);
    
    /*
    createOpcion()
    regresa un numero entera representando el ID con el cual fue insertado en la base de datos
    recibe un objeto de tipo opcion
    */
    public int createOpcion(Opcion opcion);
    
    /*
    deleteOpcion()
    regresa un booleano si la eliminacion fue exitosa
    recibe
    */
    public boolean deleteOpcion(int idOpcion);
    
    /*
    updateOpcion()
    regresa un booleano si la actualizacion fue exitosa
    recibe un objeto de tipo Opcion
    */
    public boolean updateOpcion(Opcion opcion);
}
