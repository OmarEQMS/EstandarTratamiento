package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Opcion;

public interface IOpcionServicio {
    public Opcion getOpcion(int idOpcion);
    public List<Opcion> getOpciones(int idNodo);
    public boolean getNodoEnOpciones(int idNodo);
    public boolean updateOpcionesPorSig(int idNodoSigPast, int idNodoSig);
    public int saveOpcion(Opcion opcion);
    public boolean deleteOpcion(int idOpcion);
    public boolean updateOpcion(Opcion opcion);
}
