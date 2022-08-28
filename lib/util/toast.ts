import toast from 'react-hot-toast';

export const toastError = (err: Error) => toast.error(err.message);
