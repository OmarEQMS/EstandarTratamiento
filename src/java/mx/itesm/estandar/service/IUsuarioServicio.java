package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Opcion;
import mx.itesm.estandar.bean.Usuario;

public interface IUsuarioServicio {
    public Usuario autenticar(Usuario password);
}
