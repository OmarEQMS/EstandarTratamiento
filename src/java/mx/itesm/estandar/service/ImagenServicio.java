package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Imagen;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.util.Conexion;

public class ImagenServicio implements IImagenServicio{

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

    @Override
    public int saveImagen(Imagen imagen) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteImagen(int idImagen) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateImagen(Imagen imagen) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
