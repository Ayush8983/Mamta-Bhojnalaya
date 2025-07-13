import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const TotalStats = () => {
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const salesRes = await API.get('/dashboard/sales');
      const ordersRes = await API.get('/dashboard/orders');
      setSales(salesRes.data.totalSales);
      setOrders(ordersRes.data.totalOrders);
    };
    fetchStats();
  }, []);

  return (
    <div className="flex gap-4">
      <div className="bg-green-100 p-4 rounded shadow w-1/2">
        <h3 className="text-xl font-bold">Total Sales</h3>
        <p className="text-2xl">₹ {sales || 0}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow w-1/2">
        <h3 className="text-xl font-bold">Total Orders</h3>
        <p className="text-2xl">{orders || 0}</p>
      </div>
    </div>
  );
};

export default TotalStats;
