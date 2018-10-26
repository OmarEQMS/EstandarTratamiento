package mx.itesm.estandar.controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.bean.Imagen;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.bean.Opcion;
import mx.itesm.estandar.bean.Usuario;
import mx.itesm.estandar.service.EstandarServicio;
import mx.itesm.estandar.service.ImagenServicio;
import mx.itesm.estandar.service.NodoServicio;
import mx.itesm.estandar.service.OpcionServicio;
import mx.itesm.estandar.service.UsuarioServicio;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, maxFileSize = 1024 * 1024 * 10, maxRequestSize = 1024 * 1024 * 50)
@WebServlet(name = "GestionController", urlPatterns = {"/GestionController"})
public class GestionController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String key = request.getParameter("key");

        switch (key) {
            //Eliminar
            case "EliminarEstandar": {
                //EliminarNodos (Imagenes) y Opciones
                int id = Integer.parseInt(request.getParameter("id")); //IdEstandar
                EliminarEstandar(id);
                break;
            }
            case "EliminarNodo": {
                //Elminiar Opciones e Imagen
                //Busco opciones o estandares con ese Nodo_Sig y lo pongo en 0
                int id = Integer.parseInt(request.getParameter("id")); //IdNodo
                EliminarNodo(id);
                break;
            }
            case "EliminarOpcion": {
                int id = Integer.parseInt(request.getParameter("id")); //IdOpcion
                EliminarOpcion(id);
                break;
            }

            //Update
            case "UpdateEstandar": {
                //Nombre, Descripcion, Color, Estatus
                int id = Integer.parseInt(request.getParameter("id"));
                String nombre = request.getParameter("nombre");
                String descripcion = request.getParameter("descripcion"); 
                int color = Integer.parseInt(request.getParameter("color"));
                int estatus = Integer.parseInt(request.getParameter("estatus"));
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = new Estandar();
                estandar.setIdEstandar(id);
                estandar.setNombre(nombre);
                estandar.setDescripcion(descripcion);
                estandar.setColor(color);
                estandar.setEstatus(estatus);
                es.updateEstandar(estandar);
                break;
            }
            case "UpdateNodo": {
                //Titulo, Texto, Referencias
                int id = Integer.parseInt(request.getParameter("id"));
                String titulo = request.getParameter("titulo");
                String texto = request.getParameter("texto"); 
                String referencias = request.getParameter("referencias"); 
                int idEstandar = Integer.parseInt(request.getParameter("idEstandar"));
                NodoServicio ns = new NodoServicio();
                Nodo nodo = new Nodo();
                nodo.setIdNodo(id);
                nodo.setTitulo(titulo);
                nodo.setTexto(texto);
                nodo.setReferencias(referencias);
                nodo.setIdEstandar(idEstandar);
                ns.updateNodo(nodo);
                break;
            }
            case "UpdateOpcion": {
                //Texto, Historial, idNodo_Sig
                int id = Integer.parseInt(request.getParameter("id")); //IdOpcion
                String texto = request.getParameter("texto");
                String historial = request.getParameter("historial");
                int idNodo = Integer.parseInt(request.getParameter("idNodo")); //IdNodoNew
                OpcionServicio os = new OpcionServicio();
                Opcion opcion = os.getOpcion(id);
                opcion.setTexto(texto);
                opcion.setHistorial(historial);
                opcion.setIdNodo_Sig(idNodo);
                os.updateOpcion(opcion);
                break;
            }
            
            //Update
            case "NewEstandar": {
                //Nombre
                String nombre = request.getParameter("nombre");
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = new Estandar();
                estandar.setNombre(nombre);
                estandar.setDescripcion("");
                estandar.setColor(330);
                estandar.setEstatus(0);
                int id = es.createEstandar(estandar);
                PrintWriter out = response.getWriter();
                out.print(id);
                break;
            }
            case "NewNodo": {
                //Titulo (IdEstandar)
                String titulo = request.getParameter("titulo");
                int idEstandar = Integer.parseInt(request.getParameter("idEstandar"));
                NodoServicio ns = new NodoServicio();
                Nodo nodo = new Nodo();
                nodo.setTitulo(titulo);
                nodo.setTexto("");
                nodo.setReferencias("");
                nodo.setIdEstandar(idEstandar);
                int id = ns.createNodo(nodo);
                PrintWriter out = response.getWriter();
                out.print(id);
                break;
            }
            case "NewOpcion": {
                //Texto, Historial, idNodo_Sig (idNodo_Padre)
                String texto = request.getParameter("texto");
                String historial = request.getParameter("historial");
                int idNodoPadre = Integer.parseInt(request.getParameter("idNodoPadre"));
                int idNodo = Integer.parseInt(request.getParameter("idNodo")); //IdNodoNew
                OpcionServicio os = new OpcionServicio();
                Opcion opcion = new Opcion();
                opcion.setTexto(texto);
                opcion.setHistorial(historial);
                opcion.setIdNodo_Padre(idNodoPadre);
                opcion.setIdNodo_Sig(idNodo);
                int id = os.createOpcion(opcion);
                PrintWriter out = response.getWriter();
                out.print(id);
                break;
            }

            //References
            case "ReferenciarEstandar": {
                //ID Estandar, ID Nodo                
                int id = Integer.parseInt(request.getParameter("id")); //IdEstandar
                int idNodo = Integer.parseInt(request.getParameter("idNodo")); //IdNodoNew
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(id);
                //Busco opciones que referencien al idNodo Anterior y lo cambio
                OpcionServicio os = new OpcionServicio();
                os.updateOpcionesPorSig(estandar.getIdNodo(), idNodo);
                //
                estandar.setIdNodo(idNodo);
                es.updateEstandar(estandar);
                
                break;
            }

            //Imagen
            case "SubirImagen": {
                //Eliminar la Actual y subir la Nueva
                if(ServletFileUpload.isMultipartContent(request)){ //Para verificar que sea contenido multi parte archivo
                    int id = Integer.parseInt(request.getParameter("id")); //IdNodo
                    NodoServicio ns = new NodoServicio();
                    Nodo nodo = ns.getNodo(id);
                    //Eliminar la pasada
                    ImagenServicio is = new ImagenServicio();
                    is.deleteImagen(nodo.getIdImagen());   
                    //Obtener la nueva
                    Part part = request.getPart("imaggen");
                    InputStream contenido = part.getInputStream();
                    //Guardarla
                    Imagen imagen = new Imagen();
                    imagen.setImagen(contenido);
                    int imgID = is.createImagen(imagen);
                    //Actualizar nodo
                    nodo.setIdImagen(imgID);
                    ns.updateNodo(nodo);
                }
                break;
            }

            //Password
            case "CambiarPassword": {
                //type param
                String perfil = request.getParameter("perfil");
                String pass = request.getParameter("pass");
                Usuario usuario = new Usuario();
                usuario.setPerfil(perfil);
                usuario.setPassword(pass);
                
                UsuarioServicio us = new UsuarioServicio();
                us.updateContrasena(usuario);
                
                break;
            }
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    
    void EliminarEstandar(int id) {
        NodoServicio ns = new NodoServicio();
        List<Nodo> nodos = ns.getNodos(id);
        for (int i = 0; i < nodos.size(); i++) {
            EliminarNodo(nodos.get(i).getIdNodo());
        }
        EstandarServicio es = new EstandarServicio();
        es.deleteEstandar(id);
    }

    void EliminarNodo(int id) {
        EstandarServicio es = new EstandarServicio();
        NodoServicio ns = new NodoServicio();
        ImagenServicio is = new ImagenServicio();
        OpcionServicio os = new OpcionServicio();
    
        Nodo nodo = ns.getNodo(id);
        is.deleteImagen(nodo.getIdImagen());
        //Busco opciones o estandares con ese Nodo_Sig y lo pongo en 0
        os.updateOpcionesPorSig(id, 0);
        es.updateEstandaresPorRaiz(id, 0);
        //
        List<Opcion> opciones = os.getOpciones(id);
        for (int i = 0; i < opciones.size(); i++) {
            EliminarOpcion(opciones.get(i).getIdOpcion());
        }
        //
        ns.deleteNodo(id);
    }
    void EliminarOpcion(int id){
        OpcionServicio os = new OpcionServicio();
        os.deleteOpcion(id);
    }

}
