package mx.itesm.estandar.service;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.bean.Opcion;
import mx.itesm.estandar.util.Conexion;

/*
Servicio de la Tabla Opcion
*/
public class OpcionServicio implements IOpcionServicio{

    /*
    getOpcion()
    regresa un objeto de tipo opcion
    recibe un idOpcion como referencias
    */
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
            opcion.setIdOpcion(rs.getInt("idOpcion"));
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

    /*
    getOpciones()
    regresa una lista de objetos de tipo opcion
    recibe un idNodo como referencia
    */
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
    
    /*
    getNodoEnOpciones()
    regresa un booleano si un Nodo puede ser accedido al darle click a una opcion (esta dentro del flujo)
    recibe un idNodo como referencia
    */
    @Override
    public boolean getNodoEnOpciones(int idNodo) {
        Connection conn = Conexion.getConnection();
        String sql = "SELECT * FROM Opcion WHERE(idNodo_Sig=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodo);
            ResultSet rs = ps.executeQuery();
            Opcion opcion;
            if (rs.next()) {
                bool = true;
            }
            rs.close();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;
    }
    
    /*
    updateOpcionesPorSig()
    regresa un booleano si la actualizacion fue exitosa
    recibe como referencia el viejo idNodo y el nuevo(0) idNodo
    Cuando es elimina un nodo que era siguiente de una opcion, el campo idNodo deberia de tener 0 para denotar que la opcion no tiene vinculo
    */
    @Override
    public boolean updateOpcionesPorSig(int idNodoSigPast, int idNodoSig) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Opcion SET idNodo_Sig=? WHERE (idNodo_Sig=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idNodoSig);
            ps.setInt(2, idNodoSigPast);
            ps.execute();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;
    }

    /*
    createOpcion()
    regresa un numero entera representando el ID con el cual fue insertado en la base de datos
    recibe un objeto de tipo opcion
    */
    @Override
    public int createOpcion(Opcion opcion) {
        Connection conn = Conexion.getConnection();
        String sql = "INSERT INTO Opcion (texto, historial, idNodo_Padre, idNodo_Sig) VALUES (?,?,?,?)";
        int id = 0;
        try {
            PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, opcion.getTexto());
            ps.setString(2, opcion.getHistorial());
            ps.setInt(3, opcion.getIdNodo_Padre());
            ps.setInt(4, opcion.getIdNodo_Sig());
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
    deleteOpcion()
    regresa un booleano si la eliminacion fue exitosa
    recibe
    */
    @Override
    public boolean deleteOpcion(int idOpcion) {
        Connection conn = Conexion.getConnection();
        String sql = "DELETE FROM Opcion WHERE (idOpcion=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, idOpcion);
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
    updateOpcion()
    regresa un booleano si la actualizacion fue exitosa
    recibe un objeto de tipo Opcion
    */
    @Override
    public boolean updateOpcion(Opcion opcion) {
        Connection conn = Conexion.getConnection();
        String sql = "UPDATE Opcion SET texto=?, historial=?, idNodo_Padre=?, idNodo_Sig=? WHERE (idOpcion=?)";
        boolean bool = false;
        try {
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, opcion.getTexto());
            ps.setString(2, opcion.getHistorial());
            ps.setInt(3, opcion.getIdNodo_Padre());
            ps.setInt(4, opcion.getIdNodo_Sig());
            ps.setInt(5, opcion.getIdOpcion());
            ps.execute();
            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println(this.getClass().toString().concat(ex.getMessage()));
        }
        return bool;
    }
    
}
