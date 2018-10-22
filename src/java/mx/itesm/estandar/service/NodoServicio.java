package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.util.Conexion;

public class NodoServicio implements INodoServicio{

    @Override
    public Nodo getNodo(int idNodo) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Nodo WHERE(idNodo=?)";
        Nodo nodo = new Nodo();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodo);
            ResultSet rs = ps.executeQuery();
            rs.next();
            nodo.setIdNodo(rs.getInt("idNodo"));
            nodo.setTitulo(rs.getString("titulo"));
            nodo.setTexto(rs.getString("texto"));
            nodo.setIdImagen(rs.getInt("idImagen"));
            nodo.setColor(rs.getInt("color"));
            nodo.setReferencias(rs.getString("referencias"));
            nodo.setIdEstandar(rs.getInt("idEstandar"));
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return nodo;
    }

    @Override
    public List<Nodo> getNodos(int idEstandar) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Nodo WHERE(idEstandar=?)";
        List<Nodo> nodos = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idEstandar);
            ResultSet rs = ps.executeQuery();
            Nodo nodo;
            while (rs.next()) {
                nodo = new Nodo();
                nodo.setIdNodo(rs.getInt("idNodo"));
                nodo.setTitulo(rs.getString("titulo"));
                nodo.setTexto(rs.getString("texto"));
                nodo.setIdImagen(rs.getInt("idImagen"));
                nodo.setColor(rs.getInt("color"));
                nodo.setReferencias(rs.getString("referencias"));
                nodo.setIdEstandar(rs.getInt("idEstandar"));
                nodos.add(nodo);
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return nodos;
    }

    @Override
    public int saveNodo(Nodo nodo) {
        Connection conn = Conexion.getConnection();
        String sql = "INSERT INTO Nodo (titulo, texto, idImagen, color, referencias, idEstandar) VALUES (?,?,?,?,?,?)";
        int id = 0;
        try {
            PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);            
            ps.setString(1, nodo.getTitulo());
            ps.setString(2, nodo.getTexto());
            ps.setInt(3, nodo.getIdImagen());
            ps.setInt(4, nodo.getColor());
            ps.setString(5, nodo.getReferencias());
            ps.setInt(6, nodo.getIdEstandar());
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
    public boolean deleteNodo(int idNodo) {
        Connection conn = Conexion.getConnection();
        String sql = "DELETE FROM Nodo WHERE (idNodo=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);            
            ps.setInt(1, idNodo);
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
    public boolean updateNodo(Nodo nodo) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Nodo SET titulo=?, texto=?, idImagen=?, color=?, referencias=?, idEstandar=?  WHERE (idNodo=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);            
            ps.setString(1, nodo.getTitulo());
            ps.setString(2, nodo.getTexto());
            ps.setInt(3, nodo.getIdImagen());
            ps.setInt(4, nodo.getColor());
            ps.setString(5, nodo.getReferencias());
            ps.setInt(6, nodo.getIdEstandar());
            ps.setInt(7, nodo.getIdNodo());
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
