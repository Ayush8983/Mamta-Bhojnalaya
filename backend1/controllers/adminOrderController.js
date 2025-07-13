const pool = require('../db');

// Get all orders with their items
exports.getAllAdminOrders = async (req, res) => {
  try {
    const orderResult = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    const orders = orderResult.rows;

    // Fetch order items
    const itemResult = await pool.query('SELECT * FROM order_items');
    const allItems = itemResult.rows;

    // Group items under their respective order
    const ordersWithItems = orders.map(order => {
      const items = allItems
        .filter(item => item.order_id === order.id)
        .map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          price: item.price,
          item_name: item.item_name || '', // ensure item_name is included
        }));

      return { ...order, items };
    });

    res.json(ordersWithItems);
  } catch (err) {
    console.error("❌ Error fetching admin orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, updatedOrder: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
