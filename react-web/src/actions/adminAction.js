import axiosClient from '../utils/apiClient';
import { handleApiErrorToast } from '../utils/toastUtil';

export const getLatestProducts = async () => {
    try {
        const response = await axiosClient.get('/api/product/latest-products');
        // console.log('Latest products:', response);
        
        return response.data;
    } catch (error) {
        handleApiErrorToast(error);
        
        throw error;
    }
}

export const getStatistics = async () => {
    try {
        const response = await axiosClient.get('/api/product/statistics');
        // console.log('Statistics:', response);
        
        return response.data;
    } catch (error) {
        handleApiErrorToast(error);
        
        throw error;
    }
}