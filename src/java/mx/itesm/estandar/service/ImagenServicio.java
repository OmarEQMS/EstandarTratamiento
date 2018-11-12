package mx.itesm.estandar.service;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Imagen;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.util.Conexion;

/*
Servicio de la Tabla Imagen   
*/
public class ImagenServicio implements IImagenServicio{

    /*
    getImagen()
    regresa un objeto de tipo Imagen
    recibe el idImagen como referencia
    */
    @Override
    public Imagen getImagen(int idImagen) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Imagen WHERE(idImagen=?)";
        Imagen imagen = new Imagen();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idImagen);
            ResultSet rs = ps.executeQuery();
            rs.next();
            imagen.setIdImagen(rs.getInt("idImagen"));
            imagen.setImagen(rs.getBinaryStream("imagen"));
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return imagen;
    }

    /*
    createImagen()
    regresa un numero entero correspondiente al ID de insercion del objeto en la tabla
    recibe un objeto de tipo Imagen 
    */
    @Override
    public int createImagen(Imagen imagen) {
        Connection conn = Conexion.getConnection();
        String sql = "INSERT INTO Imagen (imagen) VALUES (?)";
        int id = 0;
        try {
            PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setBinaryStream(1, imagen.getImagen());
            ps.executeUpdate();    
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                id = rs.getInt(1);
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return id;
    }

    /*
    deleteImagen()
    regresa un bolleano si la eliminacion fue exitosa
    recibe un idImagen como referencia
    */
    @Override
    public boolean deleteImagen(int idImagen) {
        Connection conn = Conexion.getConnection();
        String sql = "DELETE FROM Imagen WHERE (idImagen=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idImagen);
            ps.execute();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;
    }

    /*
    updateImagen()
    regresa un booleano si la actualizacion fue exitosa
    recibe un objeto de tipo Imagen
    */
    @Override
    public boolean updateImagen(Imagen imagen) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Imagen SET imagen=? WHERE (idImagen=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setBinaryStream(1, imagen.getImagen());
            ps.setInt(2, imagen.getIdImagen());
            ps.execute();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;
    }
    
}
