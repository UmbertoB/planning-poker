import axios from 'axios';
import { backendURLPath, env } from 'environment';

const api = axios.create({
    baseURL: `${backendURLPath}${env === 'production' ? '/api' : ''}`,
});

export default api;
