import React from 'react';
import AllCategories from '../Components/CategoryManagement/Categories';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';

export default function Categories() {
  return (
    <div className='d-flex'>
      <AdminSideBar />
      <div className='p-5'>
        <AllCategories />
      </div>
    </div>
  );
}
