package mx.itesm.estandar.bean;

public class Opciones {
    private int idOpcion;
    private String texto;
    private String color;
    private int idNodo_Padre;
    private int idNodo_Sig;

    @Override
    public String toString() {return "Opciones{" + "texto=" + texto + '}';}        
    public int getIdOpcion() {return idOpcion;}
    public String getTexto() {return texto;}
    public String getColor() {return color;}
    public int getIdNodo_Padre() {return idNodo_Padre;}
    public int getIdNodo_Sig() {return idNodo_Sig;}
    
	public void setIdOpcion(int idOpcion) {this.idOpcion = idOpcion;}
    public void setTexto(String texto) {this.texto = texto;}
    public void setColor(String color) {this.color = color;}
    public void setIdNodo_Padre(int idNodo_Padre) {this.idNodo_Padre = idNodo_Padre;}
    public void setIdNodo_Sig(int idNodo_Sig) {this.idNodo_Sig = idNodo_Sig;}
   
}
