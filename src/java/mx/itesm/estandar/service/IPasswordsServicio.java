package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Opciones;

public interface IPasswordsServicio {
    public boolean verificarGestion(String pass);
    public boolean verificarVisualizacion(String pass);
}
