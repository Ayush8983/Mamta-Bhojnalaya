import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, currentStatus) => {
    let newStatus = "";
    if (currentStatus === "pending") newStatus = "preparing";
    else if (currentStatus === "preparing") newStatus = "completed";
    else return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders(); // Refresh after update
      } else {
        alert("❌ Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error occurred while updating status");
    }
  };

  const activeOrders = orders.filter(order => order.status !== "completed");
  const completedOrders = orders.filter(order => order.status === "completed");

  if (loading) return <div className="p-6 text-center text-lg">Loading orders...</div>;

  return (
    <div className="p-6 bg-[#fffef2] min-h-screen">
      <h1 className="text-3xl font-bold text-orange-800 mb-8">🧾 Admin - Order Management</h1>

      {/* Active Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-orange-700">🟢 Active Orders</h2>
        {activeOrders.length === 0 ? (
          <p className="text-gray-600 italic mb-6">No active orders.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white p-5 rounded-lg shadow border border-orange-100">
                <div className="mb-2">
                  <p><strong>👤 Name:</strong> {order.customer_name}</p>
                  <p><strong>📞 Phone:</strong> {order.customer_phone}</p>
                  <p><strong>📍 Address:</strong> {order.customer_address}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`inline-block px-2 py-1 text-xs rounded text-white ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "preparing"
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}>
                      {order.status}
                    </span>
                  </p>
                </div>

                <div className="mt-3">
                  <strong>🍽️ Items:</strong>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                    {order.items?.length > 0 ? (
                      order.items.map((item, index) => (
                        <li key={index}>
                          {item.item_name || `Item ID: ${item.menu_item_id}`} - Qty: {item.quantity}, ₹{item.price}
                        </li>
                      ))
                    ) : (
                      <p>No items found</p>
                    )}
                  </ul>
                </div>

                {order.status !== "completed" && (
                  <button
                    onClick={() => updateStatus(order.id, order.status)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
                  >
                    {order.status === "pending" && "✅ Mark as Preparing"}
                    {order.status === "preparing" && "✅ Mark as Completed"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed Orders */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">✅ Completed Orders</h2>
        {completedOrders.length === 0 ? (
          <p className="text-gray-600 italic">No completed orders.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {completedOrders.map((order) => (
              <div key={order.id} className="bg-gray-50 p-5 rounded-lg border shadow-sm">
                <p><strong>👤 Name:</strong> {order.customer_name}</p>
                <p><strong>📞 Phone:</strong> {order.customer_phone}</p>
                <p><strong>📍 Address:</strong> {order.customer_address}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-700 font-medium">{order.status}</span>
                </p>

                <div className="mt-2">
                  <strong>🍽️ Items:</strong>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                    {order.items?.length > 0 ? (
                      order.items.map((item, index) => (
                        <li key={index}>
                          {item.item_name || `Item ID: ${item.menu_item_id}`} - Qty: {item.quantity}, ₹{item.price}
                        </li>
                      ))
                    ) : (
                      <p>No items found</p>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
