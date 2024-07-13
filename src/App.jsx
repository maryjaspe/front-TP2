import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Products from './pages/Products.jsx';
import Orders from './pages/Orders.jsx';
import Contacts from './pages/Contacts.jsx';
import We from './pages/We.jsx';
import Home from './pages/Home.jsx';
import NoMatch from './pages/NoMatch.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/we" element={<We />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
