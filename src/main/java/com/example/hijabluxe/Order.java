package com.example.hijabluxe;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Order {
    private int id;
    private String customerName;
    private String email;
    private String address;
    private double amount;
    private String paymentMethod;
    private String status;
    private String orderDate;

    public Order(int id, String customerName, String email, String address, double amount, String paymentMethod) {
        this.id = id;
        this.customerName = customerName;
        this.email = email;
        this.address = address;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.status = "Processing"; // Default status
        this.orderDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }

    // Getters
    public int getId() { return id; }
    public String getCustomerName() { return customerName; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public double getAmount() { return amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getStatus() { return status; }
    public String getOrderDate() { return orderDate; }
}