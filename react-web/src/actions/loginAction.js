import axiosClient from '../utils/apiClient';
import { showSuccessToast, handleApiErrorToast } from '../utils/toastUtil';

export const loginUser = async (body) => {
    try {
        const response = await axiosClient.post('/api/login', body);

        const { token } = response.data;
        localStorage.setItem('product_access_token', token);
        localStorage.setItem('user', JSON.stringify(response.data.result));
        
        showSuccessToast(response.data.message || 'Logged in successfully');

        return response.data;
    } catch (error) {
        handleApiErrorToast(error);
        throw error;
    }
};

export const signupUser = async (body) => {
    try {
        const response = await axiosClient.post('/api/signup', body);

        const { token } = response.data;
        localStorage.setItem('product_access_token', token);
        localStorage.setItem('user', JSON.stringify(response.data.result));
        
        showSuccessToast(response.data.message || 'Signed up successfully');

        return response.data;
    } catch (error) {
        handleApiErrorToast(error);
        throw error;
    }
}