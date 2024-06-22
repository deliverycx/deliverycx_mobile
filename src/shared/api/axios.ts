import axios from 'axios';
import {API_URL} from '../consts';

const baseUrl = `${API_URL}/api`;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
