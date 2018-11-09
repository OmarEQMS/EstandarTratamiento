package mx.itesm.estandar.controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.bean.Imagen;
import mx.itesm.estandar.bean.Nodo;
import mx.itesm.estandar.bean.Opcion;
import mx.itesm.estandar.service.EstandarServicio;
import mx.itesm.estandar.service.ImagenServicio;
import mx.itesm.estandar.service.NodoServicio;
import mx.itesm.estandar.service.OpcionServicio;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, maxFileSize = 1024 * 1024 * 10, maxRequestSize = 1024 * 1024 * 50)
@WebServlet(name = "VisualizacionController", urlPatterns = {"/VisualizacionController"})
public class VisualizacionController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String key = request.getParameter("key");

        switch (key) {
            case "GetEstandares": {
                int estatus = Integer.parseInt(request.getParameter("estatus"));
                EstandarServicio es = new EstandarServicio();
                List<Estandar> estandares = es.getEstandares(estatus);

                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(estandares));
                break;
            }

            case "GetEstandar": {
                int id = Integer.parseInt(request.getParameter("id")); //idEstandar
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(id);

                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(estandar));
                break;
            }

            case "GetColor": {
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                NodoServicio ns = new NodoServicio();
                Nodo nodo = ns.getNodo(id);
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(nodo.getIdEstandar());

                PrintWriter out = response.getWriter();
                out.println(estandar.getColor());
                break;
            }

            case "GetNodo": {
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                NodoServicio ns = new NodoServicio();
                Nodo nodo = ns.getNodo(id);
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(nodo.getIdEstandar());

                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print("[" + json.toJson(nodo) + ", {\"color\":" + estandar.getColor() + ", \"nombreEstandar\":\"" + estandar.getNombre() + "\"}]");
                break;
            }

            case "GetNodosPorEstandar": {
                int id = Integer.parseInt(request.getParameter("id")); //idEstandar
                NodoServicio ns = new NodoServicio();
                List<Nodo> nodos = ns.getNodos(id);
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(id);
                OpcionServicio os = new OpcionServicio();

                Gson json = new Gson();
                String returnJSON = json.toJson(nodos);
                PrintWriter out = response.getWriter();
                int index = 0;
                int tipo;
                int raiz;
                for (int i = 0; i < nodos.size(); i++) {
                    index = returnJSON.indexOf("}", index);
                    tipo = 0;
                    raiz = 0;
                    if (nodos.get(i).getIdNodo() == estandar.getIdNodo()) {
                        raiz = 1;
                    }
                    if (os.getNodoEnOpciones(nodos.get(i).getIdNodo())) {
                        tipo = 1;
                    }
                    returnJSON = returnJSON.substring(0, index) + ",\"tipo\":" + tipo + ",\"raiz\":" + raiz + returnJSON.substring(index, returnJSON.length());
                    index += 19;
                }
                out.print(returnJSON);
                break;
            }

            case "GetNodosPorOpcion": {
                int id = Integer.parseInt(request.getParameter("id")); //idOpcion
                OpcionServicio os = new OpcionServicio();
                Opcion opcion = os.getOpcion(id);
                NodoServicio ns = new NodoServicio();
                Nodo nodo = ns.getNodo(opcion.getIdNodo_Padre());
                int idE = nodo.getIdEstandar();

                List<Nodo> nodos = ns.getNodos(idE);
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(idE);

                Gson json = new Gson();
                String returnJSON = json.toJson(nodos);
                PrintWriter out = response.getWriter();
                int index = 0;
                int tipo;
                int raiz;
                for (int i = 0; i < nodos.size(); i++) {
                    index = returnJSON.indexOf("}", index);
                    tipo = 0;
                    raiz = 0;
                    if (nodos.get(i).getIdNodo() == estandar.getIdNodo()) {
                        raiz = 1;
                    }
                    if (os.getNodoEnOpciones(nodos.get(i).getIdNodo())) {
                        tipo = 1;
                    }
                    returnJSON = returnJSON.substring(0, index) + ",\"tipo\":" + tipo + ",\"raiz\":" + raiz + returnJSON.substring(index, returnJSON.length());
                    index += 19;
                }
                out.print(returnJSON);
                break;
            }

            case "GetNodosPorNodo": {
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                NodoServicio ns = new NodoServicio();
                Nodo nodo = ns.getNodo(id);
                int idE = nodo.getIdEstandar();

                List<Nodo> nodos = ns.getNodos(idE);
                EstandarServicio es = new EstandarServicio();
                Estandar estandar = es.getEstandar(idE);
                OpcionServicio os = new OpcionServicio();

                Gson json = new Gson();
                String returnJSON = json.toJson(nodos);
                PrintWriter out = response.getWriter();
                int index = 0;
                int tipo;
                int raiz;
                for (int i = 0; i < nodos.size(); i++) {
                    index = returnJSON.indexOf("}", index);
                    tipo = 0;
                    raiz = 0;
                    if (nodos.get(i).getIdNodo() == estandar.getIdNodo()) {
                        raiz = 1;
                    }
                    if (os.getNodoEnOpciones(nodos.get(i).getIdNodo())) {
                        tipo = 1;
                    }
                    returnJSON = returnJSON.substring(0, index) + ",\"tipo\":" + tipo + ",\"raiz\":" + raiz + returnJSON.substring(index, returnJSON.length());
                    index += 19;
                }
                out.print(returnJSON);
                break;
            }

            case "GetNodosRaiz": {
                int id = Integer.parseInt(request.getParameter("id")); //idOpcion
                OpcionServicio os = new OpcionServicio();
                NodoServicio ns = new NodoServicio();
                EstandarServicio es = new EstandarServicio();

                Opcion opcion = os.getOpcion(id);
                Nodo nodo = ns.getNodo(opcion.getIdNodo_Padre());
                int idE = nodo.getIdEstandar();

                List<Estandar> estandares = es.getEstandares(0);
                List<Nodo> nodos = new ArrayList<>();;

                for (int i = 0; i < estandares.size(); i++) {
                    if ((estandares.get(i).getIdEstandar() == idE) || (estandares.get(i).getIdNodo() == -1)) {
                        estandares.remove(i);
                    }
                }
                for (int i = 0; i < estandares.size(); i++) {
                    nodos.add(ns.getNodo(estandares.get(i).getIdNodo()));
                }
                Gson json = new Gson();
                String returnJSON = json.toJson(nodos);
                int index = 0;
                String nameEstandar;
                for (int i = 0; i < estandares.size(); i++) {
                    index = returnJSON.indexOf("}", index);
                    nameEstandar = estandares.get(i).getNombre();
                    returnJSON = returnJSON.substring(0, index) + ",\"estandar\":\"" + nameEstandar + "\"" + returnJSON.substring(index, returnJSON.length());
                    index += 15 + nameEstandar.length();
                }
                PrintWriter out = response.getWriter();
                out.print(returnJSON);
                break;
            }

            case "GetImagen": {
                int id = Integer.parseInt(request.getParameter("id")); //idImagen    
                ImagenServicio is = new ImagenServicio();
                Imagen imagen = is.getImagen(id);
                byte[] bytes = IOUtils.toByteArray(imagen.getImagen());
                String base64String = Base64.getEncoder().encodeToString(bytes);
                PrintWriter out = response.getWriter();
                out.print(base64String);
                break;
            }

            case "GetOpcionesPorNodo": {
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                OpcionServicio os = new OpcionServicio();
                NodoServicio ns = new NodoServicio();
                Nodo nodo;
                List<Opcion> opciones = os.getOpciones(id);

                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                String returnJSON = json.toJson(opciones);
                int index = 0;
                int idE_Sig = 0;
                for (int i = 0; i < opciones.size(); i++) {
                    index = returnJSON.indexOf("}", index);
                    nodo = ns.getNodo(opciones.get(i).getIdNodo_Sig());
                    idE_Sig = nodo.getIdEstandar();
                    returnJSON = returnJSON.substring(0, index) + ",\"estandar\":" + idE_Sig + returnJSON.substring(index, returnJSON.length());
                    index += 13 + Integer.toString(idE_Sig).length();
                }
                out.print(returnJSON);

                break;
            }

            case "GetOpcion": {
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                OpcionServicio os = new OpcionServicio();
                Opcion opcion = os.getOpcion(id);

                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(opcion));
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

}
