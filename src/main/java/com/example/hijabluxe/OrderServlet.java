package com.example.hijabluxe;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/place-order")
public class OrderServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Cart cart = (Cart) session.getAttribute("cart");

        if (cart != null) {
            // 1. Collect Data
            String name = request.getParameter("full_name");
            String email = request.getParameter("email");
            String addr = request.getParameter("address_line1") + ", " +
                    request.getParameter("city") + ", " +
                    request.getParameter("postcode");
            String payment = request.getParameter("payment_method");
            double total = cart.getTotalPrice();

            // 2. Access Global List
            List<Order> orderList = (List<Order>) getServletContext().getAttribute("globalOrders");
            if (orderList == null) {
                orderList = new ArrayList<>();
                getServletContext().setAttribute("globalOrders", orderList);
            }

            // 3. Create and Save Order
            Order newOrder = new Order(1001 + orderList.size(), name, email, addr, total, payment);
            orderList.add(newOrder);

            // 4. Reset Cart and Redirect
            session.removeAttribute("cart");
            response.sendRedirect("main.jsp?status=success");
        }
    }
}

