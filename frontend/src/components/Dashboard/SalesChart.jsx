import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import API from '../../services/api';

const SalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await API.get('/dashboard/report');
        const formatted = response.data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(),
          total_sales: Number(item.total_sales),
        }));
        setData(formatted);
      } catch (err) {
        console.error("Chart Load Error:", err);
      }
    };
    fetchChartData();
  }, []);

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Sales Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total_sales" stroke="#ff7300" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
