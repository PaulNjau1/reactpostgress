// src/services/auth.ts
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
};

export const register = async (username: string, email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data.token;
};
