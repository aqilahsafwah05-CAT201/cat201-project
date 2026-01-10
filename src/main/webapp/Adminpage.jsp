<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %>       
<%@ page import="java.util.ArrayList" %>
<%
    String contextPath = request.getContextPath();
    if (contextPath == null || contextPath.isEmpty()) {
        contextPath = "";
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HijabLuxe Admin - Elegant Management</title>
    <link rel="stylesheet" href="AdminStyle.css">
</head>
<body>

    <header id="header-part">
        <h1>Welcome To Admin Page</h1>
        <div class="header-tools">
        </div>
    </header>

    <div id="admin-container">
        <nav id="sidebar">
            <h1 id="ShopName">HijabLuxe</h1>
            <div class="menu-list">
                <a href="#" class="menu-item">📊 Dashboard</a>
                <a href="#" class="menu-item">🛍️ Products</a>
                <a href="#" class="menu-item">➕ Add Product</a>
                <a href="#" class="menu-item">📦 Orders</a>
                <a href="#" class="menu-item">👥 Customers</a>
                <a href="#" class="menu-item">Log Out</a>
            </div>
        </nav>

        <main id="main-content">
            <header id="content-header">
                <div class="breadcrumb-area">
                    <h1>Admin Control Center</h1>
                    <p>Full system overview for HijabLuxe.</p>
                </div>
            </header>

            <section id="dashboard" class="admin-block">
                <div class="brand-story-compact">
                    <div class="story-card">
                        <h2>Our Vision</h2>
                        <p>"To be the global benchmark for elegant coverage, where every woman feels empowered, confident, and beautiful in her identity."</p>
                    </div>
                    <div class="story-card">
                        <h2>Our Mission</h2>
                        <p>"To provide high-quality hijabs that blend traditional values with contemporary style, ensuring comfort and grace."</p>
                    </div>
                </div>

                <h2 class="block-title">📊 Performance Overview</h2>
                <div class="card-container">
                    <div class="stat-card">
                        <h3>Total Revenue</h3>
                        <p class="stat-value">$12,450.00</p>
                        <span class="trend up">+12%</span>
                    </div>
                    <div class="stat-card">
                        <h3>Pending Orders</h3>
                        <p class="stat-value">24</p>
                    </div>
                    <div class="stat-card">
                        <h3>Total Customers</h3>
                        <p class="stat-value">1,205</p>
                    </div>
                </div>
            </section>

            <section id="products" class="admin-block">
                <h2 class="block-title">🛍️ Product Inventory</h2>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock Status</th>
                            </tr>
                        </thead>
                        <tbody id="product-table-body">
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="add-product" class="admin-block">
                <h2 class="block-title">➕ Add New Product</h2>
                <form id="product-form" class="admin-form">
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" id="p-name" placeholder="e.g. Premium Silk Shawl" required>
                    </div>
                    <div class="form-row" style="display: flex; gap: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label>Category</label>
                            <select id="p-category" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ddd;">
                                <option>Square</option>
                                <option>Shawl</option>
                                <option>Inner Cap</option>
                            </select>
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label>Price ($)</label>
                            <input type="number" id="p-price" placeholder="80.00" step="0.01" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Stock Quantity</label>
                        <input type="number" id="p-stock" placeholder="50" required>
                    </div>
                    <div class="form-group">
                        <label>model.Product Image URL</label>
                        <input type="text" id="p-image" placeholder="https://image-link.com/photo.jpg">
                    </div>
                    <div class="form-actions" style="margin-top: 20px;">
                        <button type="submit" class="btn-success" style="background-color: #28a745; color: white; padding: 10px 25px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Save
                            Product</button>
                        <button type="reset" class="btn-secondary" style="padding: 10px 25px; border: none; border-radius: 6px; cursor: pointer;">Clear Form</button>
                    </div>
                </form>
            </section>

            <section id="orders" class="admin-block">
                <h2 class="block-title">📦 Recent Orders</h2>
                <div class="table-wrapper">
                    <table>
                <thead>
                            <tr style="background-color: #DB4444; color: white;">
                                <th style="padding: 12px; border: 1px solid #ddd;">Customer Name</th>
                                <th style="padding: 12px; border: 1px solid #ddd;">Email</th>
                                <th style="padding: 12px; border: 1px solid #ddd;">Address</th>
                                <th style="padding: 12px; border: 1px solid #ddd;">Payment</th>
                                <th style="padding: 12px; border: 1px solid #ddd;">Total</th>
                                <th style="padding: 12px; border: 1px solid #ddd;">Status</th>
                            </tr>
                        </thead>
                <tbody>
                            <%
                                // 1. Retrieve the Global Order List from Server Memory
                                List<String[]> adminOrderList = (List<String[]>) application.getAttribute("orderDB");

                                if(adminOrderList != null && !adminOrderList.isEmpty()) {
                                    // Loop backwards so the NEWEST orders show at the TOP
                                    for(int i = adminOrderList.size() - 1; i >= 0; i--) {
                                        String[] order = adminOrderList.get(i);
                            %>
                                <tr style="background-color: white;">
                                    <td style="padding: 12px; border: 1px solid #ddd;"><strong><%= order[0] %></strong></td> <td style="padding: 12px; border: 1px solid #ddd;"><%= order[1] %></td> <td style="padding: 12px; border: 1px solid #ddd;">
                                        <%= order[2] %>, <%= order[3] %>
                                    </td> <td style="padding: 12px; border: 1px solid #ddd;"><%= order[4].toUpperCase() %></td> <td style="padding: 12px; border: 1px solid #ddd; color: green; font-weight: bold;">
                                        <%= order[5] %>
                                    </td> <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
                                        <span style="background: #fff3cd; color: #856404; padding: 5px 10px; border-radius: 15px; font-size: 12px;">
                                            Processing
                                        </span>
                                    </td>
                                </tr>
                            <%
                                    }
                                } else {
                            %>
                                <tr>
                                    <td colspan="6" style="text-align: center; padding: 20px; color: #666; background: white;">
                                        No orders placed yet.
                                    </td>
                                </tr>
                            <%
                                }
                            %>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="customers" class="admin-block">
                <h2 class="block-title">👥 Customer Database</h2>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Email (Login ID)</th>
                                <th>User Name</th>
                                <th>Password</th> <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <%
                                // 1. Retrieve the Global User Database from Application Memory
                                Map<String, String[]> adminDB = (Map<String, String[]>) application.getAttribute("userDB");

                                if(adminDB != null && !adminDB.isEmpty()) {
                                    // 2. Loop through every user found
                                    for(String emailKey : adminDB.keySet()) {
                                        String[] details = adminDB.get(emailKey);
                            %>
                                <tr>
                                    <td><%= emailKey %></td>
                                    <td><%= details[0] %></td>
                                    <td><%= details[1] %></td>
                                    <td><span class="status-badge">Active</span></td>
                                </tr>
                            <%
                                    }
                                } else {
                            %>
                                <tr>
                                    <td colspan="4" style="text-align: center; color: #666;">
                                        No users registered yet. Go to Sign Up page first.
                                    </td>
                                </tr>
                            <%
                                }
                            %>
                        </tbody>
                </table>
            <a href="main.jsp" class="home-btn">← Back to Shop</a>
        </section>

            <section id="logout-section" class="admin-block">
                <div class="logout-container">
                    <div id="logout-confirm-view">
                        <span class="logout-icon">🔓</span>
                        <h2>Sign Out</h2>
                        <p>Are you sure you want to end your session?</p>
                        <div class="logout-actions">
                            <button id="confirm-logout-btn" class="btn-danger">Yes, Log Out</button>
                            <button id="cancel-logout-btn" class="btn-secondary">Cancel</button>
                        </div>
                    </div>
                    <div id="logout-success-view" style="display: none;">
                        <span class="logout-icon">✅</span>
                        <h2>Logged Out</h2>
                        <p>You have been successfully logged out.</p>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <footer id="footer-part">
        <div class="footer-column">
            <h2>HijabLuxe Admin</h2>
            <p>© 2025 HijabLuxe Panel</p>
        </div>
        <div class="footer-column">
            <h3>Support</h3>
            <p>Admin Help Desk: hijabluxe.dev@gmail.com</p>
        </div>
        <div class="footer-column">
            <h3>System Info</h3>
            <p>Version: v1.0.4 | Privacy Policy</p>
        </div>
    </footer>

    <script src="Admin.js"></script>
</body>
</html>