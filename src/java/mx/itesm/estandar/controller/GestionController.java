package mx.itesm.estandar.controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
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

@WebServlet(name = "GestionController", urlPatterns = {"/GestionController"})
public class GestionController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String key = request.getParameter("key");
        
        switch (key){
            //Eliminar
            case "EliminarEstandar":{      
                //EliminarNodos y Opciones
                break;
            }
            case "EliminarNodo":{   
                //Elminiar Opciones
                break;
            }
            case "EliminarOpcion":{
                
                break;
            }
            
            //Update
            case "UpdateEstandar":{   
                //Nombre, Descripcion, Color, Estatus
                break;
            }
            case "UpdateNodo":{
                //Titulo, Texto, Referencias
                break;
            }
            case "UpdateOpcion":{
                //Texto, Historial
                break;
            }
            
            //References
            case "ReferenciarEstandar":{
                //ID Estandar, ID Nodo
                break;
            }
            case "ReferenciarOpcion":{
                //ID Opcion, ID Nodo
                break;
            }
            
            //Imagen
            case "SubirImagen":{
                //Eliminar la Actual y subir la Nueva
                break;
            }
            
            //Password
            case "CambiarPassword":{
                //type param
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
