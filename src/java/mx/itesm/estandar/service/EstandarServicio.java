package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.util.Conexion;
import static mx.itesm.estandar.util.Conexion.getConnection;

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
            estandar.setColor(rs.getInt("color"));
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
    public List<Estandar> getEstandares(int estatus) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Estandar WHERE (estatus=?)";
        List<Estandar> estandares = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, estatus);
            ResultSet rs = ps.executeQuery();
            Estandar estandar;
            while (rs.next()) {
                estandar = new Estandar();
                estandar.setIdEstandar(rs.getInt("idEstandar"));
                estandar.setNombre(rs.getString("nombre"));
                estandar.setDescripcion(rs.getString("descripcion"));
                estandar.setColor(rs.getInt("color"));
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
        Connection conn = Conexion.getConnection();
        String sql = "INSERT INTO Estandar (nombre, descripcion, color, idNodo, estatus) VALUES (?,?,?,?,?)";
        int id = 0;
        try {
            PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, estandar.getNombre());
            ps.setString(2, estandar.getDescripcion());
            ps.setInt(3, estandar.getColor());
            ps.setInt(4, estandar.getIdNodo());
            ps.setInt(5, estandar.getEstatus());
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

    @Override
    public boolean deleteEstandar(int idEstandar) {
        Connection conn = Conexion.getConnection();
        String sql = "DELETE FROM Estandar WHERE (idEstandar=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idEstandar);
            ps.execute();            
            ps.close();
            conn.close();
            bool = true;
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool; 
    }

    @Override
    public boolean updateEstandar(Estandar estandar) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Estandar SET nombre=?, descripcion=?, color=?, idNodo=?, estatus=? WHERE (idEstandar=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, estandar.getNombre());
            ps.setString(2, estandar.getDescripcion());
            ps.setInt(3, estandar.getColor());
            ps.setInt(4, estandar.getIdNodo());
            ps.setInt(5, estandar.getEstatus());
            ps.setInt(6, estandar.getIdEstandar());
            ps.execute();            
            ps.close();
            conn.close();
            bool = true;
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;    
    }
    
}
