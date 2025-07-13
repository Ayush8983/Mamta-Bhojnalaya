import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to load menu", err);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryOrder = ['Paneer', 'Dal', 'Sabji', 'Rice', 'Roti', 'Other'];

  const addToCart = (item, size = null) => {
    const price = item.price || (size === "half" ? item.price_half : item.price_full);
    const newItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      price: price,
      size: size || "regular",
    };
    setCart([...cart, newItem]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#7c3a00] drop-shadow-sm">
        🍽️ Mamta Bhojnalaya Menu
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-orange-300 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-lg w-full md:w-1/2 shadow-sm"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-orange-300 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-lg shadow-sm"
        >
          <option value="All">All Categories</option>
          {categoryOrder.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryOrder.map((category) => {
          const items = groupedMenu[category];
          if (!items) return null;
          if (filter !== "All" && filter !== category) return null;

          return (
            <div key={category} className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center border-b pb-2">{category}</h2>
              {items
                .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                .map((item) => (
                  <div key={item.id} className="flex gap-4 items-center border-b py-3">
                    {item.image_url && (
                      <img
                        src={`http://localhost:5000/uploads/${item.image_url}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.price_half ? `Half: ₹${item.price_half} ` : ""}
                        {item.price_full ? `| Full: ₹${item.price_full}` : ""}
                        {item.price && !item.price_half && !item.price_full ? `₹${item.price}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {item.price_half && (
                        <button
                          onClick={() => addToCart(item, "half")}
                          className="bg-orange-500 text-white text-xs px-3 py-1 rounded-md hover:bg-orange-600"
                        >
                          Add Half
                        </button>
                      )}
                      {item.price_full && (
                        <button
                          onClick={() => addToCart(item, "full")}
                          className="bg-orange-500 text-white text-xs px-3 py-1 rounded-md hover:bg-orange-600"
                        >
                          Add Full
                        </button>
                      )}
                      {!item.price_half && !item.price_full && item.price && (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-500 text-white text-xs px-3 py-1 rounded-md hover:bg-orange-600"
                        >
                          Add ₹{item.price}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="mt-12 bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-[#333] mb-4">🛒 Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <>
            <ul className="space-y-2 text-sm text-gray-700">
              {cart.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{item.name} {item.size && `(${item.size})`}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
              <li className="font-semibold flex justify-between pt-2 border-t border-gray-300">
                <span>Total</span>
                <span>₹{total}</span>
              </li>
            </ul>
            <button
              onClick={() => navigate("/order")}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Proceed to Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
