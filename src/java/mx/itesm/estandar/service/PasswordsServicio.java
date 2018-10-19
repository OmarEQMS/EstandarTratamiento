package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import mx.itesm.estandar.bean.Nodos;
import mx.itesm.estandar.util.Conexion;

public class PasswordsServicio implements IPasswordsServicio{

    @Override
    public boolean verificarGestion(String pass) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT Gestion FROM Passwords WHERE(Gestion=SHA2(?,224))";
        boolean paso = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, pass);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                paso = true;
            }            
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return paso;
    }

    @Override
    public boolean verificarVisualizacion(String pass) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT Visualizacion FROM Passwords WHERE(Visualizacion=SHA2(?,224))";
        boolean paso = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, pass);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                paso = true;
            }            
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return paso;
    }
    
}
