import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Form from './pages/form';
import Property from './pages/property';
import Payment from './pages/payment';
import Invalid from './pages/404';

import { CartProvider } from './context/CartContext';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider >
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Form />} />
          <Route path="/propiedades/:id" element={<Property />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Invalid />} />
        </Routes>
      </Router>
      </CartProvider>
  );
}

export default App;
