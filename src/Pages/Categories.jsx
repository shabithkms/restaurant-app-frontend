import React, { useEffect } from 'react';
import AllCategories from '../Components/CategoryManagement/Categories';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import { useNavigate } from 'react-router';

export default function Categories() {
  let navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem('admin');
    if (admin) {
      navigate('/categories');
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <div className='d-flex'>
      <AdminSideBar />
      <div className='p-5'>
        <AllCategories />
      </div>
    </div>
  );
}
