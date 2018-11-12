package mx.itesm.estandar.service;
import java.util.List;
import mx.itesm.estandar.bean.Imagen;
import mx.itesm.estandar.bean.Nodo;

/*
Interfaz de el Servicio de la Tabla Imagen   
*/
public interface IImagenServicio {
    
    /*
    getImagen()
    regresa un objeto de tipo Imagen
    recibe el idImagen como referencia
    */
    public Imagen getImagen(int idImagen);
    
    /*
    createImagen()
    regresa un numero entero correspondiente al ID de insercion del objeto en la tabla
    recibe un objeto de tipo Imagen 
    */
    public int createImagen(Imagen imagen);
    
    /*
    deleteImagen()
    regresa un bolleano si la eliminacion fue exitosa
    recibe un idImagen como referencia
    */
    public boolean deleteImagen(int idImagen);
    
    /*
    updateImagen()
    regresa un booleano si la actualizacion fue exitosa
    recibe un objeto de tipo Imagen
    */
    public boolean updateImagen(Imagen imagen);
}
