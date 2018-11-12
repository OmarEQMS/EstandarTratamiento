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

/*
Servicio de la Tabla Estandar
*/
public class EstandarServicio implements IEstandarServicio{

     /*
    getEstandar() 
    regresa un objeto de tipo Estandar
    recibe como referencia el idEstandar
    */
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
    
    /*
    getEstandares() 
    regresa una Lista de tipo Estandar 
    recibe como argumento el estatus (publicado o no)
    Si el estatus es igual a 0, me regresa los estandares publicados y no publicados, Si es igual a 1 solamente me regresa los publicados
    */
    @Override
    public List<Estandar> getEstandares(int estatus) {
        Connection conn = Conexion.getConnection();    
        String sql = "SELECT * FROM Estandar";
        if(estatus==1){sql = sql + " WHERE (estatus=1)";}
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
    
    /*
    updateEstandaresPorRaiz()
    regresa un booleano si la actualizacion del Estandar fue exitosa
    recibe como referencia el viejo idNodo(Raiz) y el nuevo(-1) idNodo(Raiz)
    Cuando es elimina un nodo que era raiz de un estandar, el campo idNodo deberia de tener -1 para denotar que no tiene vinculo
    */
    @Override
    public boolean updateEstandaresPorRaiz(int idNodo_Raiz_Past, int idNodo_Raiz) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Estandar SET idNodo=? WHERE (idNodo=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodo_Raiz);
            ps.setInt(2, idNodo_Raiz_Past);
            ps.execute();            
            ps.close();
            conn.close();
            bool = true;
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;  
    }

    /*
    createEstandar()
    regresa un numero entero que representa el ID con el cual se inserto en la Base de Datos
    recibe como referencia un objeto tipo Estadar
    */
    @Override
    public int createEstandar(Estandar estandar) {
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

    /*
    deleteEstandar() 
    regresa un booleano si la eliminacion fue exitosa
    recibe como referencia el idEstandar
    */
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

    /*
    updateEstandar() 
    regresa un booleano si la actualizacion del Estandar fue exitosa
    recibe como referencia un objeto tipo Estadar
    */
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
