package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.util.Conexion;

public class EstandarServicio implements IEstandarServicio{

    @Override
    public Estandar getEstandar(int idEstandar) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Estandar WHERE(idEstandar=?)";
        Estandar estandar = new Estandar();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idEstandar);
            ResultSet rs = ps.executeQuery();
            rs.next();
            estandar.setIdEstandar(rs.getInt("idEstandar"));
            estandar.setNombre(rs.getString("nombre"));
            estandar.setDescripcion(rs.getString("descripcion"));
            estandar.setIdNodo(rs.getInt("idNodo"));
            estandar.setEstatus(rs.getInt("estatus"));
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return estandar;
    }

    @Override
    public List<Estandar> getEstandares() {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Estandar WHERE (estatus=1)";
        List<Estandar> estandares = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            Estandar estandar;
            while (rs.next()) {
                estandar = new Estandar();
                estandar.setIdEstandar(rs.getInt("idEstandar"));
                estandar.setNombre(rs.getString("nombre"));
                estandar.setDescripcion(rs.getString("descripcion"));
                estandar.setIdNodo(rs.getInt("idNodo"));
                estandar.setEstatus(rs.getInt("estatus"));
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
    public int saveEstandar(Estandar estandar) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteEstandar(int idEstandar) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateEstandar(Estandar estandar) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
