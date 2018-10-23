package mx.itesm.estandar.controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.itesm.estandar.bean.Estandar;
import mx.itesm.estandar.bean.Usuario;
import mx.itesm.estandar.service.EstandarServicio;
import mx.itesm.estandar.service.UsuarioServicio;
import mx.itesm.estandar.service.VisitasServicio;

@WebServlet(name = "AutenticacionController", urlPatterns = {"/Estandar"})
public class AutenticacionController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String pass = request.getParameter("pass");
        if(pass==null){
            request.getRequestDispatcher("acceso.html").forward(request, response); return;
        }
        
        UsuarioServicio us = new UsuarioServicio();
        Usuario usuario = new Usuario();
        usuario.setPassword(pass);
        usuario = us.autenticar(usuario);
        
        if(usuario.getPerfil().equals("visualizacion")){
            VisitasServicio vs = new VisitasServicio(); vs.nuevaVisita();
            request.getRequestDispatcher("WEB-INF/estandar.html").forward(request, response); return;
        }else if(usuario.getPerfil().equals("gestion")){
            request.getRequestDispatcher("WEB-INF/gestion.html").forward(request, response); return;
        }else{
            request.getRequestDispatcher("acceso.html").forward(request, response); return;
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
