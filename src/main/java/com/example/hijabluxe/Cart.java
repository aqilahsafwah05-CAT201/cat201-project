package com.example.hijabluxe;

import java.util.ArrayList;

public class Cart {
    private User user;
    private ArrayList<Product> items;
    // --- ADD THIS CONSTRUCTOR ---
    // This allows you to say "new Cart()" in main.jsp
    public Cart() {
        // Initialize the list so it doesn't crash later
        this.items = new java.util.ArrayList<>(); 
    }

    // Constructor
    public Cart(User user) {
        this.user = user;
        items = new ArrayList<>();
    }

 public void addItem(Product p) {
        // Only try to get the username if the user actually exists!
        if (this.user != null) {
            System.out.println("Adding " + p.getName() + " to cart for " + this.user.getUsername());
        }
        
        // Add the item to the list
        this.items.add(p);
    }
    // Remove product from cart
    public void removeItem(Product product) {
        if (items.remove(product)) {
            System.out.println(product + " removed from " + user.getUsername() + "'s cart.");
        } else {
            System.out.println(product + " not found in the cart.");
        }
    }

    // Calculate total price
    public double getTotalPrice() {
        double total = 0;
        for (Product p : items) {
            total += p.getPrice();
        }
        return total;
    }

    // Get cart items
    public ArrayList<Product> getItems() {
        return items;
    }
}
