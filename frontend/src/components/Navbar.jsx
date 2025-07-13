import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-700 to-orange-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:text-yellow-100 transition"
        >
          🍛 Mamta Bhojnalaya
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-3 text-sm sm:text-base">
          <Link
            to="/"
            className="hover:text-yellow-200 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="hover:text-yellow-200 font-medium transition"
          >
            Menu
          </Link>
          <Link
            to="/order"
            className="hover:text-yellow-200 font-medium transition"
          >
            Cart
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/admin"
                className="hover:text-yellow-200 font-medium transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-500 font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className=" text-white-700 px-3 py-1 rounded-md font-semibold hover:text-yellow-200 font-medium transition"
            >
              Admin Login
            </Link>
          )}
            

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
