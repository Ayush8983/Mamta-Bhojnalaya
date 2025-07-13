// src/services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-api-url.com/api', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
