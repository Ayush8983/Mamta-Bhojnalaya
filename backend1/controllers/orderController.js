const db = require('../db');

// Create a new order
exports.placeOrder = async (req, res) => {
  const {
    customer_name: name,
    customer_phone: phone,
    customer_address: address,
    items
  } = req.body;

  if (!name || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Calculate total price
    const totalPrice = items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    // Insert into orders table
    const orderResult = await db.query(
      `INSERT INTO orders (customer_name, customer_phone, customer_address, total_price)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, phone, address, totalPrice]
    );

    const orderId = orderResult.rows[0].id;

    // Insert each item into order_items table
    const insertPromises = items.map(item => {
      return db.query(
        `INSERT INTO order_items (order_id, item_name, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.item_name, item.quantity, item.price]
      );
    });

    await Promise.all(insertPromises);

    res.status(201).json({ success: true, orderId });
  } catch (err) {
    console.error('❌ Order Placement Error:', err.message);
    res.status(500).json({ message: 'Server error while placing order' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
