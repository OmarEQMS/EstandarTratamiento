package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Estandares;

public interface IEstandaresServicio {
    public Estandares getEstandar(int idEstandar);
    public List<Estandares> getEstandares();
    public int saveEstandar(Estandares estandar);
    public boolean deleteEstandar(int idEstandar);
    public boolean updateEstandar(Estandares estandar);
}
