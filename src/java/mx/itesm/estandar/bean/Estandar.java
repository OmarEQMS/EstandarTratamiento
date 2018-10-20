package mx.itesm.estandar.bean;

public class Estandar {
    private int idEstandar;
    private String nombre;
    private String descripcion;
    private int idNodo;
    private int estatus;
        
    @Override
    public String toString() {return "Estandares{" + "nombre=" + nombre + '}';}
   
    public int getIdEstandar() {return idEstandar;}
    public String getNombre() {return nombre;}
    public String getDescripcion() {return descripcion;}
    public int getIdNodo() {return idNodo;}
    public int getEstatus() {return estatus;}
    
    public void setIdEstandar(int idEstandar) {this.idEstandar = idEstandar;}
    public void setNombre(String nombre) {this.nombre = nombre;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
    public void setIdNodo(int idNodo) {this.idNodo = idNodo;}
    public void setEstatus(int status) {this.estatus = estatus;}
    
}
