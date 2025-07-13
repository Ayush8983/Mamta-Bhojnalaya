const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.locals.pool = pool;

pool.connect((err, client, release) => {
  if (err) {
    return console.error("DB connection error", err.stack);
  }
  console.log("✅ Connected to PostgreSQL");
  release();
});

// ✅ Routes
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin/orders", require("./routes/adminOrderRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin/menu", require("./routes/adminMenuRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Default test route
app.get("/", (req, res) => {
  res.send("Mamta Bhojnalaya backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
