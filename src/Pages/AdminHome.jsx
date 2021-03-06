import React, { useEffect } from 'react';
import AllItems from '../Components/AllItems/AllItems';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import { useNavigate } from 'react-router';

export default function AdminHome() {
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
    <div className='d-flex'>
      <AdminSideBar />
      <div className='p-5'>
        <AllItems />
      </div>
    </div>
  );
}
