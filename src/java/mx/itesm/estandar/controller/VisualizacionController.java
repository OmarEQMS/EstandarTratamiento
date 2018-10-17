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
import mx.itesm.estandar.bean.Estandares;
import mx.itesm.estandar.bean.Imagenes;
import mx.itesm.estandar.bean.Nodos;
import mx.itesm.estandar.bean.Opciones;
import mx.itesm.estandar.service.EstandaresServicio;
import mx.itesm.estandar.service.ImagenesServicio;
import mx.itesm.estandar.service.NodosServicio;
import mx.itesm.estandar.service.OpcionesServicio;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, maxFileSize = 1024 * 1024 * 10, maxRequestSize = 1024 * 1024 * 50)
@WebServlet(name = "Visualizacion", urlPatterns = {"/Visualizacion"})
public class VisualizacionController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {       
        String key = request.getParameter("key");
        
        switch (key){
            case "GetEstandares":{
                EstandaresServicio es = new EstandaresServicio();
                List<Estandares> estandares = es.getEstandares();
                
                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(estandares));
                break;
            }
            
            case "GetEstandar":{
                int id = Integer.parseInt(request.getParameter("id")); //idEstandar
                EstandaresServicio es = new EstandaresServicio();
                Estandares estandar = es.getEstandar(id);
                
                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(estandar));
                break;
            }
            
            case "GetNodo":{
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                NodosServicio ns = new NodosServicio();
                Nodos nodos = ns.getNodo(id);
                
                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(nodos));
                break;
            }
            
            case "GetImagen":{
                int id = Integer.parseInt(request.getParameter("id")); //idImagen    
                ImagenesServicio is = new ImagenesServicio();
                Imagenes imagen = is.getImagen(id);
                byte[] bytes = IOUtils.toByteArray(imagen.getImagen());
                String base64String = Base64.getEncoder().encodeToString(bytes);
                PrintWriter out = response.getWriter();                
                out.print(base64String); 
                break;
            }
            
            case "GetOpcionesPorNodo":{
                int id = Integer.parseInt(request.getParameter("id")); //idNodo
                OpcionesServicio os = new OpcionesServicio();
                List<Opciones> opciones = os.getOpciones(id);
                
                PrintWriter out = response.getWriter();
                Gson json = new Gson();
                out.print(json.toJson(opciones));
                break;
            }
            
            case "GetOpcion":{
                int id = Integer.parseInt(request.getParameter("id")); //idOpcion 
                OpcionesServicio os = new OpcionesServicio();
                Opciones opcion = os.getOpcion(id);
                
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
