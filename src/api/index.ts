import axios from 'axios';
import { API_URL } from 'config';
import { getAccessToken } from 'context/auth/store';

export const api = () => {
    return axios.create({
        baseURL: `${API_URL}/api/`,
        headers: {
            authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json',
        },
    });
};
