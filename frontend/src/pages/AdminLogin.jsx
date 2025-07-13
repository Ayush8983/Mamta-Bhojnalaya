import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      alert('✅ Login successful');
      navigate('/admin-dashboard'); // redirect to dashboard
    } catch (err) {
      console.error('Login failed:', err);
      setError('❌ Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffef2] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="p-6 max-w-md w-full bg-white rounded shadow mt-10"
      >
        <h2 className="text-xl font-bold mb-4 text-orange-700">Admin Login</h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
