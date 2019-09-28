import { toast } from 'react-toastify';

export default {
  error(message: any) {
    return toast.error(message, {
      className: 'toast-error',
    })
  },
  info(message: any) {
    return toast.info(message, {
      className: 'toast-info',
    })
  },
}
