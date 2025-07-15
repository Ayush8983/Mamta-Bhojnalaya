
# 🍽️ Mamta Bhojnalaya - Restaurant Web Application

A full-stack restaurant management web application built for **Mamta Bhojnalaya** as part of an internship with Info Bharat Interns.

This application allows customers to view the menu, add items to a cart, and place orders. Admins can manage the menu, view and update orders, and access sales reports.

---

## 📌 Features

### 🧑‍🍳 Customer Side
- Clean landing page with restaurant intro
- Full menu display with categories, images, and half/full prices
- Add items to cart
- Review and place orders with customer details

### 🛠️ Admin Panel
- Admin authentication/login
- Add, update, or delete menu items (with image upload)
- View all customer orders
- Update order statuses (Pending → Preparing → Delivered)
- View sales statistics and top-selling dishes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TailwindCSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Others
- Multer (for image uploads)
- Render / Railway (for deployment)

---

## 🧩 Folder Structure

```
mamta-bhojnalaya/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── uploads/
│   └── db.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── index.js
│
└── README.md
```

---

## ⚙️ Setup Instructions (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mamta-bhojnalaya.git
cd mamta-bhojnalaya
```

### 2. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 3. Configure Database

- PostgreSQL setup required
- Create a `.env` file in the `backend/` folder:

```
 PORT=5000
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
```

- Run schema manually or use SQL files to create `menu`, `orders`, `order_items`, and `admins` tables.

### 4. Run the Project

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run dev
```

---

## 📦 API Endpoints (Sample)

- `GET /api/menu` - Get all menu items
- `POST /api/orders` - Place an order
- `GET /api/admin/orders` - View all orders (admin)
- `PUT /api/admin/orders/:id/status` - Update order status
- `POST /api/admin/menu` - Add menu item
- `PUT /api/admin/menu/:id` - Edit menu item
- `DELETE /api/admin/menu/:id` - Delete menu item
- `GET /api/admin/stats/sales` - View sales stats

---

## 👤 Admin Login Credentials

> Replace this with your real admin if you have registration

- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 📸 Screenshots

### Landing Page


### Menu Page


### Admin Dashboard




---


## 🙌 Acknowledgements

This project was developed as part of an internship with **Info Bharat Interns**.


---
