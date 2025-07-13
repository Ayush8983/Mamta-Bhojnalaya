import React from 'react';
import { useNavigate } from 'react-router-dom';
import TotalStats from '../components/Dashboard/TotalStats';
import TopItems from '../components/Dashboard/TopItems';
import SalesChart from '../components/Dashboard/SalesChart';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf0] to-[#fffbe9] p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-orange-800 drop-shadow-sm">
            📊 Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            View sales insights and manage restaurant data.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/admin/menu')}
            className="px-5 py-2 bg-orange-600 text-white rounded-md shadow hover:bg-orange-700 transition-all"
          >
            🍽 Manage Menu
          </button>
          <button
            onClick={() => navigate('/admin/orders')}
            className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-all"
          >
            📦 Manage Orders
          </button>
        </div>
      </div>

      {/* Stats & Charts */}
      <div className="space-y-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <TotalStats />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <SalesChart />
        </div>

        {/* <div className="bg-white p-6 rounded-xl shadow-md">
          <TopItems />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
