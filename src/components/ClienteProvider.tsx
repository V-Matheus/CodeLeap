'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ReactNode } from 'react';

interface ClienteProviderProps {
  children: ReactNode;
}

export default function ClienteProvider({ children }: ClienteProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
