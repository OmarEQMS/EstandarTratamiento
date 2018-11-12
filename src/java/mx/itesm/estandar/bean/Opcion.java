package mx.itesm.estandar.bean;

/*
Bean de Tabla Opcion
+ Atributos:
    int idOpcion;
    String texto;
    String historial;
    int idNodo_Padre;
    int idNodo_Sig;
+ Acceso Atravez de Getters y Seters
*/
public class Opcion {
    private int idOpcion;
    private String texto;
    private String historial;
    private int idNodo_Padre;
    private int idNodo_Sig;

    public Opcion() {
        this.idOpcion = 0;
        this.texto = "";
        this.historial = "";
        this.idNodo_Padre = 0;
        this.idNodo_Sig = 0;
    }
    
    @Override
    public String toString() {return "Opciones{" + "texto=" + texto + '}';}   
    
    public int getIdOpcion() {return idOpcion;}
    public String getTexto() {return texto;}
    public String getHistorial() {return historial;}
    public int getIdNodo_Padre() {return idNodo_Padre;}
    public int getIdNodo_Sig() {return idNodo_Sig;}
    
    public void setIdOpcion(int idOpcion) {this.idOpcion = idOpcion;}
    public void setTexto(String texto) {this.texto = texto;}
    public void setHistorial(String historial) {this.historial = historial;}
    public void setIdNodo_Padre(int idNodo_Padre) {this.idNodo_Padre = idNodo_Padre;}
    public void setIdNodo_Sig(int idNodo_Sig) {this.idNodo_Sig = idNodo_Sig;}
   
}
