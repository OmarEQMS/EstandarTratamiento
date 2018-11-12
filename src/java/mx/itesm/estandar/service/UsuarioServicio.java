package mx.itesm.estandar.service;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.bean.Usuario;
import mx.itesm.estandar.util.Conexion;

/*
Servicio de la Tabla Usuario
*/
public class UsuarioServicio implements IUsuarioServicio{

    /*
    autenticar()
    regresa un objeto de tipo usuario
    recibe un objeto de tipo Usuario con la contraseña
    */
    @Override
    public Usuario autenticar(Usuario usuario) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT perfil, password FROM Usuario WHERE(password=SHA2(?,224))";
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, usuario.getPassword());
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                usuario.setPerfil(rs.getString("perfil"));
            }            
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return usuario;
    }
    
    /*
    updateContrasena()
    regresa un booleano si la actualizacion de la contraseña fue exitosa
    recibe un objeto de tipo Usuario
    */
    @Override
    public boolean updateContrasena(Usuario usuario) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Usuario SET password=SHA2(?,224) WHERE (perfil=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, usuario.getPassword());
            ps.setString(2, usuario.getPerfil());
            ps.execute();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;
    }
    
}
