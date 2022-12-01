import toast from 'react-hot-toast';

export const toastSuccess = (message: string) => {
  toast.success(message);
};

export const toastError = (err: Error) => {
  toast.error(err.message);
};
