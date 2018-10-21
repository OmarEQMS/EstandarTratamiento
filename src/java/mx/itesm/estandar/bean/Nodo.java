package mx.itesm.estandar.bean;
import java.io.InputStream;

public class Nodo {
    private int idNodo;
    private String titulo; 
    private String texto;
    private int idImagen;
    private int color;
    private String referencias;
    private int idEstandar;

    public Nodo() {
        this.idNodo = 0;
        this.titulo = "";
        this.texto = "";
        this.idImagen = 0;
        this.color = 0;
        this.referencias = "";
        this.idEstandar = 0;
    }
    
    @Override
    public String toString() {return "Nodos{" + "titulo=" + titulo + '}';}  
    
    public int getIdNodo() {return idNodo;}
    public String getTitulo() {return titulo;}
    public String getTexto() {return texto;}
    public int getIdImagen() {return idImagen;}
    public int getColor() {return color;}
    public String getReferencias() {return referencias;}
    public int getIdEstandar() {return idEstandar;}
    
    public void setIdNodo(int idNodo) {this.idNodo = idNodo;}
    public void setTitulo(String titulo) {this.titulo = titulo;}
    public void setTexto(String texto) {this.texto = texto;}
    public void setIdImagen(int idImagen) {this.idImagen = idImagen;}
    public void setColor(int color) {this.color = color;}
    public void setReferencias(String referencias) {this.referencias = referencias;}
    public void setIdEstandar(int idEstandar) {this.idEstandar = idEstandar;}
        
}
