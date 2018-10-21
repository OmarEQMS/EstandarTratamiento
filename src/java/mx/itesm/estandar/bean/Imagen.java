package mx.itesm.estandar.bean;
import java.io.InputStream;

public class Imagen {
    private int idImagen;
    private InputStream imagen;

    public Imagen() {
        this.idImagen = 0;
        //this.imagen = ;
    }

    @Override
    public String toString() {return "Imagenes{" + "idImagen=" + idImagen + '}';}    
    
    public int getIdImagen() {return idImagen;}
    public InputStream getImagen() {return imagen;}
    
    public void setIdImagen(int idImagen) {this.idImagen = idImagen;}
    public void setImagen(InputStream imagen) {this.imagen = imagen;}    
    
}
