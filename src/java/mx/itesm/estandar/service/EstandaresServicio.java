package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Estandares;
import mx.itesm.estandar.util.Conexion;

public class EstandaresServicio implements IEstandaresServicio{

    @Override
    public Estandares getEstandar(int idEstandar) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM estandares WHERE(idEstandar=?)";
        Estandares estandar = new Estandares();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idEstandar);
            ResultSet rs = ps.executeQuery();
            rs.next();
            estandar.setIdEstandar(rs.getInt("idEstandar"));
            estandar.setNombre(rs.getString("nombre"));
            estandar.setDescripcion(rs.getString("descripcion"));
            estandar.setIdNodo(rs.getInt("idNodo"));
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return estandar;
    }

    @Override
    public List<Estandares> getEstandares() {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM estandares";
        List<Estandares> estandares = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            Estandares estandar;
            while (rs.next()) {
                estandar = new Estandares();
                estandar.setIdEstandar(rs.getInt("idEstandar"));
                estandar.setNombre(rs.getString("nombre"));
                estandar.setDescripcion(rs.getString("descripcion"));
                estandar.setIdNodo(rs.getInt("idNodo"));
                estandares.add(estandar);
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return estandares;
    }

    @Override
    public int saveEstandar(Estandares estandar) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteEstandar(int idEstandar) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateEstandar(Estandares estandar) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
