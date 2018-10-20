package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Estandar;

public interface IEstandarServicio {
    public Estandar getEstandar(int idEstandar);
    public List<Estandar> getEstandares();
    public int saveEstandar(Estandar estandar);
    public boolean deleteEstandar(int idEstandar);
    public boolean updateEstandar(Estandar estandar);
}
