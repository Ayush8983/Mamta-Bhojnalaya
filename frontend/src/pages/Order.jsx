import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handlePlaceOrder = async () => {
    if (!customerName.trim() || customerName.length < 3) {
      alert("Please enter a valid name.");
      return;
    }
    if (!/^\d{10}$/.test(customerPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!customerAddress.trim()) {
      alert("Please enter your address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/orders", {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        items: cart.map((item) => ({
          item_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      if (response.data.success) {
        alert("✅ Order placed successfully!");
        localStorage.removeItem("cart");
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
        navigate("/");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("❌ Failed to place order. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-orange-700 mb-6 text-center drop-shadow-sm">
          🧾 Your Order Summary
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="mb-8">
            <ul className="space-y-3">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.name} {item.size ? `(${item.size})` : ""}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-semibold text-orange-600">
                    ₹{item.price * item.quantity}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right text-xl font-bold text-gray-800">
              Total: ₹{totalAmount}
            </div>
          </div>
        )}

        {/* Customer Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-5 text-orange-700 border-b pb-2">
            🧍 Enter Your Details
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="tel"
            placeholder="Phone (10 digits)"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            placeholder="Address"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={3}
          />
          <button
            onClick={handlePlaceOrder}
            disabled={cart.length === 0 || loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg transition duration-300 ${
              loading || cart.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
