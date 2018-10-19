package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Estandares;
import mx.itesm.estandar.bean.Nodos;
import mx.itesm.estandar.bean.Nodos;
import mx.itesm.estandar.util.Conexion;

public class NodosServicio implements INodosServicio{

    @Override
    public Nodos getNodo(int idNodo) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Nodos WHERE(idNodo=?)";
        Nodos nodo = new Nodos();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodo);
            ResultSet rs = ps.executeQuery();
            rs.next();
            nodo.setIdNodo(rs.getInt("idNodo"));
            nodo.setTitulo(rs.getString("titulo"));
            nodo.setTexto(rs.getString("texto"));
            nodo.setIdImagen(rs.getInt("idImagen"));
            nodo.setColor(rs.getString("color"));
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
    public List<Nodos> getNodos(int idEstandar) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Nodos WHERE(idEstandar=?)";
        List<Nodos> nodos = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idEstandar);
            ResultSet rs = ps.executeQuery();
            Nodos nodo;
            while (rs.next()) {
                nodo = new Nodos();
                nodo.setIdNodo(rs.getInt("idNodo"));
                nodo.setTitulo(rs.getString("titulo"));
                nodo.setTexto(rs.getString("texto"));
                nodo.setIdImagen(rs.getInt("idImagen"));
                nodo.setColor(rs.getString("color"));
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
    public int saveNodo(Nodos nodo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteNodo(int idNodo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateNodo(Nodos nodo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
