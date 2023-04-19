import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Form from './pages/form';
import Invalid from './pages/404';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Invalid />} />
      </Routes>
    </Router>
  );
}

export default App;
