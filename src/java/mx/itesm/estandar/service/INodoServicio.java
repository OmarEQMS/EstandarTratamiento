package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Nodo;

public interface INodoServicio {
    public Nodo getNodo(int idNodo);
    public List<Nodo> getNodos(int idEstandar);
    public int saveNodo(Nodo nodo);
    public boolean deleteNodo(int idNodo);
    public boolean updateNodo(Nodo nodo);
}
