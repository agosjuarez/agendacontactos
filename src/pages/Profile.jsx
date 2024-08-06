import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/api';
import { useAuth } from '../hooks/useAuth';

function Profile() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUser();
        setFormData({ name: data.name, email: data.email });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUser(formData);
      setUser(data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">Update</button>
    </form>
  );
}

export default Profile;
