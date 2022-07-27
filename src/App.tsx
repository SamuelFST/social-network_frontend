import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <CustomRoutes />
      <ToastContainer autoClose={5000} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
