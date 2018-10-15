package mx.itesm.estandar.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {
    
    public static Connection getConnection(){
        
        String cadena = "jdbc:mysql://localhost:3306/sapi?user=root&password=";
        
        Connection connection=null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            connection=DriverManager.getConnection(cadena);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            //log.i();
        }
        return connection;
        
    }
    
    public static void main(String[] args){
        if(getConnection()!=null){
            System.out.println("Se conecto");
        }else{
            System.out.println("No se conecto");
        }
    }
}
