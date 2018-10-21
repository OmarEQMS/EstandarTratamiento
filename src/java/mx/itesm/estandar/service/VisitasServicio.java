package mx.itesm.estandar.service;

import java.sql.CallableStatement;
import java.sql.Connection;
import mx.itesm.estandar.util.Conexion;

public class VisitasServicio implements IVisitasServicio{

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
}
