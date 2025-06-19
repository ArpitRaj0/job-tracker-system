import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const AddJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    notes: ''
  });

  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: {
          Authorization: token
        }
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to add job. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #bdc3c7, #2c3e50)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        color: '#fff'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontWeight: '600',
          color: '#fff'
        }}>📌 Add New Job</h2>

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
        />

        {error && <p style={{ color: 'salmon', marginBottom: '10px' }}>{error}</p>}

        <button type="submit" style={submitStyle}>
          ➕ Submit Job
        </button>
      </form>
    </div>
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '16px',
  transition: '0.3s'
};

const submitStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#16a085',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background 0.3s ease'
};

export default AddJob;

