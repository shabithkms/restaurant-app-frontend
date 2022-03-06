import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Login from '../Components/AdminLogin/Login';

export default function AdminLogin() {
  let navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem('admin');
    if (admin) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}
