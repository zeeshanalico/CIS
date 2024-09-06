import './index.css';
import App from './App'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import ErrorBoundary from './components/error/ErrorBoundary';
import { Toaster } from './components/ui/toaster';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

const Main = () => {
  return <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <Toaster />
    </ErrorBoundary>
  </StrictMode>
}


createRoot(document.getElementById('root')!).render(<Main />);
