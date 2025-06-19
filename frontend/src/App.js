import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import AdminPanel from './pages/AdminPanel';
import EditJob from './pages/EditJob';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/edit-job/:id" element={<EditJob />} />

      </Routes>
    </Router>
  );
}

export default App;


