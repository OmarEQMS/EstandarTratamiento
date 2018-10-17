package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Nodos;
import mx.itesm.estandar.bean.Opciones;
import mx.itesm.estandar.util.Conexion;

public class OpcionesServicio implements IOpcionesServicio{

    @Override
    public Opciones getOpcion(int idOpcion) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM opciones WHERE(idOpcion=?)";
        Opciones opcion = new Opciones();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idOpcion);
            ResultSet rs = ps.executeQuery();
            rs.next();
            opcion.setIdOpcion(rs.getInt("idNodo"));
            opcion.setTexto(rs.getString("texto"));
            opcion.setColor(rs.getString("color"));
            opcion.setIdNodo_Padre(rs.getInt("idNodo_Padre"));
            opcion.setIdNodo_Sig(rs.getInt("idNodo_Sig"));
            conn.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return opcion;
    }

    @Override
    public List<Opciones> getOpciones(int idNodo) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM nodos WHERE(idNodo=?)";
        List<Opciones> opciones = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodo);
            ResultSet rs = ps.executeQuery();
            Opciones opcion;
            while (rs.next()) {
                opcion = new Opciones();
                opcion.setIdOpcion(rs.getInt("idNodo"));
                opcion.setTexto(rs.getString("texto"));
                opcion.setColor(rs.getString("color"));
                opcion.setIdNodo_Padre(rs.getInt("idNodo_Padre"));
                opcion.setIdNodo_Sig(rs.getInt("idNodo_Sig"));
                opciones.add(opcion);
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return opciones;
    }

    @Override
    public int saveOpcion(Opciones opcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteOpcion(int idOpcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateOpcion(Opciones opcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
