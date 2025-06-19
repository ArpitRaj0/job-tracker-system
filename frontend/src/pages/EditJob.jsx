import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    notes: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: { Authorization: token }
        });
        const job = res.data;
        setFormData({
          company: job.company,
          role: job.role,
          status: job.status,
          appliedDate: job.appliedDate?.split('T')[0],
          notes: job.notes || ''
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load job details.');
      }
    };

    fetchJob();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, formData, {
        headers: { Authorization: token }
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Update failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>✏️ Edit Job</h2>

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
            <option value="Accepted">Accepted</option>
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
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            style={{ ...inputStyle, resize: 'none' }}
          />

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#e67e22',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Update Job
          </button>
        </form>
      </div>
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

export default EditJob;
