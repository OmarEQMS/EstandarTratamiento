package mx.itesm.estandar.service;
import java.util.List;
import mx.itesm.estandar.bean.Opcion;
import mx.itesm.estandar.bean.Usuario;

/*
Interfaz de el Servicio de la Tabla Usuario
*/
public interface IUsuarioServicio {
    
    /*
    autenticar()
    regresa un objeto de tipo usuario
    recibe un objeto de tipo Usuario con la contraseña
    */
    public Usuario autenticar(Usuario password);
    
    /*
    updateContrasena()
    regresa un booleano si la actualizacion de la contraseña fue exitosa
    recibe un objeto de tipo Usuario
    */
    public boolean updateContrasena(Usuario usuario);
}
