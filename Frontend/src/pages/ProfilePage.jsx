import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ProfilePage = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  console.log(token)

  const fetchUser = async () => {
    try {
      if (!token) {
        console.warn('Token missing');
        setLoading(false);
        return;
      }

      const res = await fetch(backendUrl + '/api/user/profile', 
        
        {headers: {token}}
      );

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
      <div className="mb-4">
        <label className="block font-medium">Name:</label>
        <p className="text-gray-700">{user.name}</p>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Email:</label>
        <p className="text-gray-700">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
