// mamta-bhojnalaya-frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Order';
import AdminDashboard from './pages/AdminDashboard';
import AdminMenuManager from './pages/AdminMenuManager';
import AdminOrderManager from './pages/AdminOrders';
import AdminLogin from './pages/AdminLogin';
// import Login from './pages/Login';
import Navbar from './components/Navbar';
// import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Order" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<AdminMenuManager />} />
         <Route path="/admin/orders" element={<AdminOrderManager />} />
         <Route path="/login" element={<AdminLogin />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
