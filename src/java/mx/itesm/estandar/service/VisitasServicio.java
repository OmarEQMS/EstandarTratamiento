package mx.itesm.estandar.service;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.util.Conexion;

/*
Servicio de la Tabla Visitas
*/
public class VisitasServicio implements IVisitasServicio{

    /*
    nuevaVisita()
    no regresa nada
    no recibe nada
    */
    @Override
    public void nuevaVisita() {
        Connection conn = Conexion.getConnection();    
        String sql = "CALL NuevaVisita()";
        try {            
            CallableStatement cstmt = conn.prepareCall(sql);            
            cstmt.execute();            
            cstmt.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
    }    
    
    /*
    getVisitas()
    regresa el numero de visitas en el modulo de visualizacion
    no recibe nada
    */
    @Override
    public int getVisitas() {
        Connection conn = Conexion.getConnection();    
        String sql = "SELECT conteo FROM Visitas";
        int visitas = 0;
        try {            
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                visitas = rs.getInt("conteo");
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return visitas;
    } 
    
}
