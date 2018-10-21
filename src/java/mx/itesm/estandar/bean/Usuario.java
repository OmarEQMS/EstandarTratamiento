package mx.itesm.estandar.bean;

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
