package mx.itesm.estandar.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {
    
    public static Connection getConnection(){
        String cadena = "jdbc:mysql://omarquinteroms.xyz:3306/EstandarTratamiento?user=semestrei&password=semestrei2018!&noAccessToProcedureBodies=true&useSSL=false";
        //String cadena = "jdbc:mysql://omarquinteroms.xyz:3306/EstandarTratamiento?user=semestrei&password=semestrei2018!&noAccessToProcedureBodies=true&verifyServerCertificate=true&useSSL=true&requireSSL=true";
        //String cadena = "jdbc:mysql://localhost:3306/EstandarTratamiento?user=root";

        Connection connection=null;
        try{           
            //System.setProperty("javax.net.ssl.trustStore","truststore"); 
            //System.setProperty("javax.net.ssl.trustStorePassword","semestrei2018!");
            //System.setProperty("javax.net.ssl.keyStore","clientKeystore.p12"); 
            //System.setProperty("javax.net.ssl.keyStorePassword","semestrei2018!");
            Class.forName("com.mysql.jdbc.Driver");
            connection=DriverManager.getConnection(cadena);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
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
