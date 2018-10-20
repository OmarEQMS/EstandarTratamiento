package mx.itesm.estandar.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.bean.Opcion;
import mx.itesm.estandar.util.Conexion;

public class OpcionServicio implements IOpcionServicio{

    @Override
    public Opcion getOpcion(int idOpcion) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Opcion WHERE(idOpcion=?)";
        Opcion opcion = new Opcion();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idOpcion);
            ResultSet rs = ps.executeQuery();
            rs.next();
            opcion.setIdOpcion(rs.getInt("idNodo"));
            opcion.setTexto(rs.getString("texto"));
            opcion.setHistorial(rs.getString("historial"));
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
    public List<Opcion> getOpciones(int idNodo) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Opcion WHERE(idNodo_Padre=?)";
        List<Opcion> opciones = new ArrayList<>();
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodo);
            ResultSet rs = ps.executeQuery();
            Opcion opcion;
            while (rs.next()) {
                opcion = new Opcion();
                opcion.setIdOpcion(rs.getInt("idOpcion"));
                opcion.setTexto(rs.getString("texto"));
                opcion.setHistorial(rs.getString("historial"));
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
    public int saveOpcion(Opcion opcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean deleteOpcion(int idOpcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean updateOpcion(Opcion opcion) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
