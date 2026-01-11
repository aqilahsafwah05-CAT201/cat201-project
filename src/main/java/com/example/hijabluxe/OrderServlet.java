package com.example.hijabluxe;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

// This maps the URL "/orders" to this Java file
@WebServlet(name = "OrderServlet", value = "/orders")
public class OrderServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        // 1. Get Form Data
        String name = request.getParameter("full_name");
        String email = request.getParameter("email");
        String address = request.getParameter("address_line1");
        String city = request.getParameter("city");
        String payment = request.getParameter("payment_method");

        // 2. Get Cart Total from Session
        HttpSession session = request.getSession();
        Cart cart = (Cart) session.getAttribute("cart");
        String totalAmount = "0.00";
        if (cart != null) {
            totalAmount = String.format("%.2f", cart.getTotalPrice());
        }

        // 3. Get the Global Order List (application scope)
        // Note: In Servlets, "application" is called "getServletContext()"
        List<String[]> orderDB = (List<String[]>) getServletContext().getAttribute("orderDB");
        if (orderDB == null) {
            orderDB = new ArrayList<>();
            getServletContext().setAttribute("orderDB", orderDB);
        }

        // 4. Save the Order
        if (name != null && email != null) {
            String[] newOrder = { name, email, address, city, payment, "RM " + totalAmount };
            orderDB.add(newOrder);
            
            // Clear the cart
            session.removeAttribute("cart");
        }

        // 5. Send User Back to Main Page with a success signal
        response.sendRedirect("main.jsp?status=success");
    }
}