'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

interface ClienteProviderProps {
  children: ReactNode;
}

export default function ClienteProvider({ children }: ClienteProviderProps) {
  return (
    <Provider store={store}>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  );
}
