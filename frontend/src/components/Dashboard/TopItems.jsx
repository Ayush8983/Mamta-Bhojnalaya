import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const TopItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/dashboard/popular').then(res => setItems(res.data));
  }, []);

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2">Top-Selling Items</h3>
      <ul>
        {items.map(item => (
          <li key={item.name} className="flex justify-between py-1 border-b">
            <span>{item.name}</span>
            <span>{item.total_sold} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopItems;
