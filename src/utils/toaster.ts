import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PropsToaster } from '../types';

export const toaster = () => {

    const messageToast = ({
        theme = 'colored',
        message='Registro exitoso!',
        autoClose = 2000,
        type = 'success',
        position='bottom-right'
    }:PropsToaster) => {
        if(type === 'success'){
            toast.success(`${message}`, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                transition: Bounce,
            });
        }
    
        if(type === 'error'){
            toast.error(`${message}`, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                transition: Bounce,
            });
        }
    
        if(type === 'warning'){
            toast.warn(`${message}`, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                transition: Bounce,
            });
        }
    
        if(type === 'info'){
            toast.info(`${message}`, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                transition: Bounce,
            });
        }
    }

    return{
        messageToast,
        ToastContainer
    }
}