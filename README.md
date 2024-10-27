# Products, Orders, and Customers Management

This project is a web application built with the latest version of Angular (18.2.6) to manage products, orders, and customers. The app demonstrates best practices in Angular development, including a well-structured project architecture, responsive design, and the use of modern web development techniques.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)

## Features

- **Products Page**: Displays a list of all available products, with indicators for low stock items. Allows users to edit product details.
- **Orders Page**: Shows all orders in the system, including the total price and payment method for each order.
- **Order Details Page**: Provides detailed information on a specific order, including the customer details, products, and quantities.
- **Responsive Design**: Works seamlessly on both large and small screens.
- **Well-structured Project**: Uses modern Angular patterns and best practices for maintainability and scalability.
- **Integration with JSON Server**: Merges the three provided JSON files into a single file for easy local data management.

## Project Structure

The project follows a modular structure, with dedicated modules for each feature (Products, Orders, and Customers). It uses lazy loading to optimize performance and SCSS for styling. The key services for handling data are:

- `getOrders()`: Fetches the list of orders.
- `getOrder(orderId)`: Retrieves the details of a specific order.
- `getProducts()`: Fetches the list of products.
- `addOrder(order)`: Adds a new order to the system.
- `editProductQuantity(productId, quantity)`: Updates the quantity of a specific product.

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mustafayoussef/products-task.git
   cd products-task
2. **Install Dependencies**
  Run the following command to install all required packages:
   ```bash
   npm install
3. **Merge the JSON Files**
  The three JSON files (products, orders, and customers) are merged into a single file located at `src/assets/data/db.json`. This allows the app to interact with a single JSON server instance.
  
## Running the Application

1. **Start the Development Server**
   ```bash
   ng serve
  - Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to any source file.
2. **Run the JSON Server**
  To serve the merged JSON file, run:
   ```bash
   json-server --watch src/assets/data/db.json --port 3000
  - The JSON server will be available at `http://localhost:3000/`, providing endpoints for products, orders, and customers.

