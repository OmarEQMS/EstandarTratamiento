package mx.itesm.estandar.bean;

/*
Bean de Tabla Usuario
+ Atributos:
    String perfil;
    String password;
+ Acceso Atravez de Getters y Seters
*/
public class Usuario {
    private String perfil;
    private String password;

    public Usuario() {
        this.perfil = "";
        this.password = "";
    }
    
    @Override
    public String toString() { return "Password{" + "perfil=" + perfil + '}'; }

    public String getPerfil() { return perfil; }
    public String getPassword() { return password; }

    public void setPerfil(String perfil) { this.perfil = perfil; }
    public void setPassword(String password) { this.password = password; }
    
}
