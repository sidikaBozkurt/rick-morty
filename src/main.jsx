import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// React Query istemcisini oluştur
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>{/*<Route>, <Link>) çalıştırabilmek için uygulamayı <BrowserRouter> ile sarmalarız.*/}
      <QueryClientProvider client={queryClient}>
        <App />{/*React Query'yi tüm uygulamaya tanıtıyoruz.*/}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
