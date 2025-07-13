import { useState, useEffect } from "react";
import axios from "axios";

export default function Order() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in all details");
      return;
    }

    try {
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
      } else {
        throw new Error("Unknown error occurred");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#fffef2] p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">
        Your Order Summary 🧾
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="mb-6">
          <ul className="space-y-3">
            {cart.map((item, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">
                      {item.name} {item.size ? `(${item.size})` : ""}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-bold text-xl">Total: ₹{totalAmount}</div>
        </div>
      )}

      {/* Customer Form */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-orange-700">
          Enter Your Details
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          placeholder="Address"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          onClick={handlePlaceOrder}
          disabled={cart.length === 0}
          className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
