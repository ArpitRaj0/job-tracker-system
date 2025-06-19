import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: token }
        });
        const jobRes = await axios.get('http://localhost:5000/api/admin/jobs', {
          headers: { Authorization: token }
        });

        setUsers(userRes.data);
        setJobs(jobRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch admin data.');
      }
    };

    fetchAdminData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`, {
        headers: { Authorization: token }
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete job');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        padding: '40px',
        background: 'linear-gradient(to right, #bdc3c7, #2c3e50)',
        color: '#fff'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '30px',
          letterSpacing: '1px'
        }}>
          👑 Admin Panel
        </h2>

        {error && <p style={{ color: 'salmon', textAlign: 'center' }}>{error}</p>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* USERS */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '25px',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>👥 All Users</h3>
            {users.map(user => (
              <div key={user._id} style={{
                backgroundColor: '#ffffff11',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '15px',
                color: '#ecf0f1',
                boxShadow: 'inset 0 0 6px rgba(255,255,255,0.1)'
              }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> <span style={{
                  padding: '3px 10px',
                  borderRadius: '5px',
                  backgroundColor: user.role === 'admin' ? '#27ae60' : '#2980b9',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}>{user.role}</span></p>
              </div>
            ))}
          </div>

          {/* JOBS */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '25px',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>📋 All Jobs</h3>
            {jobs.map(job => (
              <div key={job._id} style={{
                backgroundColor: '#ffffff11',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '15px',
                color: '#ecf0f1',
                boxShadow: 'inset 0 0 6px rgba(255,255,255,0.1)',
                position: 'relative'
              }}>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Role:</strong> {job.role}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>User ID:</strong> {job.user}</p>
                <p><strong>Date:</strong> {job.appliedDate?.split('T')[0]}</p>
                {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}
                <button
                  onClick={() => handleDelete(job._id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ❌ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

