import axiosClient from '../utils/apiClient';
import { showSuccessToast, handleApiErrorToast } from '../utils/toastUtil';

export const addProduct = async (productData) => {
    try {
        const response = await axiosClient.post('/api/product/add', productData);
        
        // Show success toast
        showSuccessToast(response.data.message || 'Product added successfully');
        
        return response.data;
    } catch (error) {
        handleApiErrorToast(error);
        throw error;
    }
};