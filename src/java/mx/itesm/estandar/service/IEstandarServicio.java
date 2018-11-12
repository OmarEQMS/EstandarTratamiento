package mx.itesm.estandar.service;
import java.util.List;
import mx.itesm.estandar.bean.Estandar;

/*
Interfaz de el Servicio de la Tabla Estandar
*/
public interface IEstandarServicio {
    
    /*
    getEstandar() 
    regresa un objeto de tipo Estandar
    recibe como referencia el idEstandar
    */
    public Estandar getEstandar(int idEstandar);
    
    /*
    getEstandares() 
    regresa una Lista de tipo Estandar 
    recibe como argumento el estatus (publicado o no)
    Si el estatus es igual a 0, me regresa los estandares publicados y no publicados, Si es igual a 1 solamente me regresa los publicados
    */
    public List<Estandar> getEstandares(int estatus);
    
    /*
    updateEstandaresPorRaiz()
    regresa un booleano si la actualizacion del Estandar fue exitosa
    recibe como referencia el viejo idNodo(Raiz) y el nuevo(-1) idNodo(Raiz)
    Cuando es elimina un nodo que era raiz de un estandar, el campo idNodo deberia de tener -1 para denotar que no tiene vinculo
    */
    public boolean updateEstandaresPorRaiz(int idNodo_Raiz_Past, int idNodo_Raiz);
    
    /*
    createEstandar()
    regresa un numero entero que representa el ID con el cual se inserto en la Base de Datos
    recibe como referencia un objeto tipo Estadar
    */
    public int createEstandar(Estandar estandar);
    
    /*
    deleteEstandar() 
    regresa un booleano si la eliminacion fue exitosa
    recibe como referencia el idEstandar
    */
    public boolean deleteEstandar(int idEstandar);
    
    /*
    updateEstandar() 
    regresa un booleano si la actualizacion del Estandar fue exitosa
    recibe como referencia un objeto tipo Estadar
    */
    public boolean updateEstandar(Estandar estandar);
}
