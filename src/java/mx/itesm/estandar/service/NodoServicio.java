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
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteNodo(int idNodo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateNodo(Nodo nodo) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
