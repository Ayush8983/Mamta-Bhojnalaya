import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminMenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priceHalf, setPriceHalf] = useState('');
  const [priceFull, setPriceFull] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/menu');
      setMenuItems(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch menu:', err);
    }
  };

  const handleAddItem = async () => {
    if (!name || !category || !priceFull || !imageFile) {
      return alert('⚠️ Please fill all required fields');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price_half', priceHalf);
    formData.append('price_full', priceFull);
    formData.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/api/admin/menu', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('✅ Item added successfully!');
      setName('');
      setCategory('');
      setDescription('');
      setPriceHalf('');
      setPriceFull('');
      setImageFile(null);
      fetchMenu();
    } catch (err) {
      console.error('❌ Error adding item:', err);
      alert('❌ Failed to add item');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/menu/${id}`);
      alert('🗑️ Item deleted');
      fetchMenu();
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('❌ Failed to delete item');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#fffef2] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-orange-700 text-center">🍲 Admin Menu Manager</h1>

      {/* Add Item Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">Add New Menu Item</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Dish Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <input
            type="number"
            placeholder="Half Price (optional)"
            value={priceHalf}
            onChange={(e) => setPriceHalf(e.target.value)}
            className="p-2 border rounded w-full"
          />

          <input
            type="number"
            placeholder="Full Price"
            value={priceFull}
            onChange={(e) => setPriceFull(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mt-4 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 mt-4 border rounded"
        />

        <button
          onClick={handleAddItem}
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded shadow"
        >
          ➕ Add Item
        </button>
      </div>

      {/* Menu Items List */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">Current Menu</h2>

        {menuItems.length === 0 ? (
          <p className="text-gray-500 italic">No items available.</p>
        ) : (
          <ul className="space-y-5">
            {menuItems.map((item) => (
              <li key={item.id} className="flex items-start gap-4 border-b pb-5">
                {item.image_url && (
                  <img
                    src={`http://localhost:5000/uploads/${item.image_url}`}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  )}
                </div>

                <div className="text-right min-w-[100px]">
                  {item.price_half ? (
                    <>
                      <p className="text-sm">Half: ₹{item.price_half}</p>
                      <p className="text-sm">Full: ₹{item.price_full}</p>
                    </>
                  ) : (
                    <p className="text-sm font-medium">₹{item.price_full}</p>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
