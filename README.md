#  Sneaker E-Commerce API

This is a **RESTful API** built with **Node.js, Express, and MongoDB** for managing a sneaker e-commerce platform.  
It supports **user authentication (JWT-based)**, **product management (CRUD with image uploads)**, and **order handling**.  
Products include sneakers with attributes like name, description, price, category, and image.

---

## 🚀 Project Overview

This API provides:

- 👤 **User Authentication**
  - Register new users
  - Login with JWT token authentication
- 👟 **Sneaker Product Management**
  - Add sneakers (with image upload)
  - Update sneakers
  - Delete sneakers
  - Fetch all sneakers or a single sneaker by ID
- 📦 **Orders (extendable)**
  - Place orders for sneakers
  - Track user-specific orders
- 🖼️ **File Upload Support**
  - Images uploaded to an `uploads/` folder
  - Access served via Express static route

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sneaker-ecom-api.git
cd sneaker-ecom-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sneaker_ecom
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server
```bash
npm start
```
The API will be available at:
```
http://localhost:5000
```

---

## 📂 Project Structure
```
sneaker-ecom-api/
├── models/              # Mongoose models (User, Product, Order)
├── routes/              # Express routes (auth, products, orders)
├── middleware/          # JWT auth, error handlers
├── uploads/             # Uploaded sneaker images
├── server.js            # App entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
```

---

## 🔑 Authentication

Most routes (except register/login) require authentication.  
Pass JWT in the **Authorization header**:

```
Authorization: Bearer <your_token>
```

---

## 📌 API Documentation

### 👤 Users

#### Register User
**POST** `/api/users/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "_id": "64b123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt-token"
}
```

#### Login User
**POST** `/api/users/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "_id": "64b123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt-token"
}
```

---

### 👟 Products (Sneakers)

#### Add Product
**POST** `/api/products`  
Headers: `Authorization: Bearer <token>`  
Form-data (for image upload):
```
name: Nike Air Max
description: Stylish running sneakers
price: 120
category: Running
image: (upload file)
```

Response:
```json
{
  "_id": "64c456...",
  "name": "Nike Air Max",
  "description": "Stylish running sneakers",
  "price": 120,
  "category": "Running",
  "image": "/uploads/123abc.jpg"
}
```

#### Get All Products
**GET** `/api/products`

Response:
```json
[
  {
    "_id": "64c456...",
    "name": "Nike Air Max",
    "description": "Stylish running sneakers",
    "price": 120,
    "category": "Running",
    "image": "/uploads/123abc.jpg"
  }
]
```

#### Get Single Product
**GET** `/api/products/:id`

Response:
```json
{
  "_id": "64c456...",
  "name": "Nike Air Max",
  "description": "Stylish running sneakers",
  "price": 120,
  "category": "Running",
  "image": "/uploads/123abc.jpg"
}
```

#### Update Product
**PUT** `/api/products/:id`  
Headers: `Authorization: Bearer <token>`

Form-data (optional fields):
```
name: Nike Air Zoom
price: 140
```

Response:
```json
{
  "_id": "64c456...",
  "name": "Nike Air Zoom",
  "description": "Stylish running sneakers",
  "price": 140,
  "category": "Running",
  "image": "/uploads/123abc.jpg"
}
```

#### Delete Product
**DELETE** `/api/products/:id`  
Headers: `Authorization: Bearer <token>`

Response:
```json
{ "message": "Product deleted successfully" }
```

---

### 📦 Orders (Optional/Extendable)

#### Place Order
**POST** `/api/orders`  
Headers: `Authorization: Bearer <token>`

Request:
```json
{
  "products": [
    { "productId": "64c456...", "quantity": 2 }
  ],
  "totalPrice": 240
}
```

Response:
```json
{
  "_id": "64c789...",
  "user": "64b123...",
  "products": [
    { "productId": "64c456...", "quantity": 2 }
  ],
  "totalPrice": 240,
  "status": "Pending"
}
```

---

## 🖼️ Image Uploads

- Images are stored in `/uploads` directory
- Accessible via `http://localhost:5000/uploads/<filename>`

---

## ✅ Features

- Secure authentication with JWT
- CRUD APIs for sneaker products
- File/image upload support
- MongoDB integration
- Ready for frontend integration (React, Next.js, etc.)

---

## 📌 Future Improvements

- Add order tracking & shipment
- Add product search & filtering

