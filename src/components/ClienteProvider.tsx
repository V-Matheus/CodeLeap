'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ReactNode, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ClienteProviderProps {
  children: ReactNode;
}

export default function ClienteProvider({ children }: ClienteProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
