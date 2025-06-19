import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>🎯 Job Tracker</div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/add-job" style={linkStyle}>Add Job</Link>
        {role === 'admin' && (
          <Link to="/admin" style={linkStyle}>Admin Panel</Link>
        )}
        <button onClick={handleLogout} style={logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '16px'
};

const logoutButton = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  padding: '6px 14px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Navbar;
