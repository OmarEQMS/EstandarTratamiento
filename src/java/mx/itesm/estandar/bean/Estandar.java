package mx.itesm.estandar.bean;

/*
Bean de Tabla Estandar
+ Atributos:
    int idEstandar;
    String nombre;
    String descripcion;
    int color;
    int idNodo;
    int estatus;
+ Acceso Atravez de Getters y Seters
*/
public class Estandar {
    private int idEstandar;
    private String nombre;
    private String descripcion;
    private int color;
    private int idNodo;
    private int estatus;

    public Estandar() {
        this.idEstandar = 0;
        this.nombre = "";
        this.descripcion = "";
        this.color = 0;
        this.idNodo = 0;
        this.estatus = 0;
    }
    
    @Override
    public String toString() {return "Estandares{" + "nombre=" + nombre + '}';}
   
    public int getIdEstandar() {return idEstandar;}
    public String getNombre() {return nombre;}
    public String getDescripcion() {return descripcion;}
    public int getColor() {return color;}
    public int getIdNodo() {return idNodo;}
    public int getEstatus() {return estatus;}
    
    public void setIdEstandar(int idEstandar) {this.idEstandar = idEstandar;}
    public void setNombre(String nombre) {this.nombre = nombre;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
    public void setColor(int color) {this.color = color;}
    public void setIdNodo(int idNodo) {this.idNodo = idNodo;}
    public void setEstatus(int estatus) {this.estatus = estatus;}
    
}
