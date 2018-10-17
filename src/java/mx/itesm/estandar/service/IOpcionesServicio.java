package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Opciones;

public interface IOpcionesServicio {
    public Opciones getOpcion(int idOpcion);
    public List<Opciones> getOpciones(int idNodo);
    public int saveOpcion(Opciones opcion);
    public boolean deleteOpcion(int idOpcion);
    public boolean updateOpcion(Opciones opcion);
}
