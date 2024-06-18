import axios from 'axios';

const baseUrl = 'http://192.168.1.200:3000/api';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
