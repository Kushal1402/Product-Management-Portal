import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast configuration
const toastConfig = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

// Toast functions
export const showToast = (message, type = 'info') => {
    switch (type) {
        case 'success':
            toast.success(message, toastConfig);
            break;
        case 'error':
            toast.error(message, toastConfig);
            break;
        case 'warning':
            toast.warning(message, toastConfig);
            break;
        case 'info':
        default:
            toast.info(message, toastConfig);
            break;
    }
};

export const showSuccessToast = (message) => showToast(message, 'success');
export const showErrorToast = (message) => showToast(message, 'error');
export const showWarningToast = (message) => showToast(message, 'warning');
export const showInfoToast = (message) => showToast(message, 'info');

export const handleApiResponseToast = (response, successMessage) => {
    if (response && (response.status === 200 || response.status === 201)) {
        showSuccessToast(successMessage || response.data?.message || 'Operation successful');
        return true;
    }
    return false;
};

export const handleApiErrorToast = (error) => {
    if (error.response) {
        showErrorToast(error.response.data?.message || 'An error occurred. Please try again.');
    } else if (error.request) {
        showErrorToast('No response received from server. Please check your connection.');
    } else {
        showErrorToast('An error occurred. Please try again later.');
    }
};