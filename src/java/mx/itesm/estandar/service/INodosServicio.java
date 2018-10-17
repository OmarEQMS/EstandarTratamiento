package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Nodos;

public interface INodosServicio {
    public Nodos getNodo(int idNodo);
    public List<Nodos> getNodos(int idEstandar);
    public int saveNodo(Nodos nodo);
    public boolean deleteNodo(int idNodo);
    public boolean updateNodo(Nodos nodo);
}
