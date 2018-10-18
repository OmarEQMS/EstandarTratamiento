package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Imagenes;
import mx.itesm.estandar.bean.Nodos;

public interface IImagenesServicio {
    public Imagenes getImagen(int idImagen);
    public int saveImagen(Imagenes imagen);
    public boolean deleteImagen(int idImagen);
    public boolean updateImagen(Imagenes imagen);
}
