package mx.itesm.estandar.service;

import java.util.List;
import mx.itesm.estandar.bean.Imagen;
import mx.itesm.estandar.bean.Nodo;

public interface IImagenServicio {
    public Imagen getImagen(int idImagen);
    public int saveImagen(Imagen imagen);
    public boolean deleteImagen(int idImagen);
    public boolean updateImagen(Imagen imagen);
}
