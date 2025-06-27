# 📦 Product Inventory Manager 

A single-page **Product Inventory Manager** web app built using **HTML**, **CSS**, and **JavaScript**. It provides a simple yet powerful interface to manage products in a warehouse or store. The app uses a hosted API (via `JSON Server` on Render) to simulate real-world inventory operations such as adding, updating, deleting, and filtering products.

---

## 📋 Project Description

This project simulates a basic inventory system where users can manage product details without page reloads. It is designed as a learning exercise in:

- Working with RESTful APIs
- DOM manipulation
- Writing clean, reusable JavaScript code
- Practicing asynchronous data handling using `fetch()`

Each product contains the following core attributes:

- ✅ Product Name  
- ✅ Category  
- ✅ Quantity  
- ✅ Price  

All data is persisted and served from a hosted `JSON Server` API.

---

## 🎯 MVP (Minimum Viable Product)

### 📌 Product Display
- Fetch and display all products from a live API.
- Each product is rendered with:
  - Name
  - Category
  - Quantity
  - Price

### 🛠️ User Interactions
Users can:
- ✅ **Add a new product**
- ✅ **Update stock or price**
- ✅ **Delete a product**
- ✅ **Filter products by category**
- ✅ **Search products by name or code**

### 🧠 Core JavaScript Features
- Uses `fetch()` to retrieve and post data asynchronously.
- All actions happen on a **single page**—no reloads or redirects.
- Event listeners are used for:
  - `click` → delete, edit, issue/receive stock
  - `submit` → add product
  - `change` → filter by category
- Uses array methods like `.filter()` and `.map()` to manipulate and display product data.
- Follows **DRY (Don’t Repeat Yourself)** principles by using reusable functions.

---

## 🧪 Technologies Used

| Tech         | Description                          |
|--------------|--------------------------------------|
| **HTML5**    | Page structure and layout             |
| **CSS3**     | Custom styling and responsive layout  |
| **JavaScript** | Core logic and DOM manipulation     |
| **JSON Server (Render)** | Simulated REST API for data |

---

## 🔐 Login Credentials (Demo)

To access the application:

- **Username:** `admin`
- **Password:** `1234`

> Note: This is a mock login for demonstration purposes only. No real authentication system is implemented.

---

## 🖥️ Features Overview

- Responsive UI with search, filter, and interactive buttons
- Auto-generated product codes
- Category-based warehouse aisle assignment
- Add/edit/delete product entries in real-time
- Stock update (issue/receive) functionality
- LocalStorage used for session management (login/logout simulation)

---

## 🚀 Live Deployment

- **Frontend (GitHub Pages):**  
  [https://lydianeema.github.io/Product-inventory-manager/](https://lydianeema.github.io/Product-inventory-manager/)
- **Backend (JSON Server via Render):**  
  [https://product-inventory-manager.onrender.com/products](https://product-inventory-manager.onrender.com/products)

---

## 🚀 Getting Started Locally

### 1. Clone this repository

```bash
git clone https://github.com/LydiaNeema/Product-inventory-manager.git
cd Product-inventory-manager
```
### 2. Set up the backend
bash

cd backend
npm install
npm start

The backend will run at http://localhost:10000

### 3. Run the frontend
Simply open index.html in your browser.

📂 File Structure
pgsql
Copy
Edit
├── backend/
│   ├── db.json             # Local database for JSON Server
│   ├── server.js           # Custom server with CORS enabled
│   ├── package.json
├── index.html              # Main HTML page
├── style.css               # Styling
├── index.js                # JavaScript logic
├── login.html              # Simple login simulation
└── README.md

### 💡 Future Enhancements
Warehouse management with detailed zones

Stock movement logs and history

Role-based access (e.g., admin vs. staff)

Backend integration with Node.js or Firebase

PWA capabilities for offline access

### 🙋‍♀️ Author
Lydia [@lydiadev]
Software Engineering Student | Passionate about Web Development

### 📜 License
This project is open-source and free to use for educational purposes.