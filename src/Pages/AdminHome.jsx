import React from 'react';
import AllItems from '../Components/AllItems/AllItems';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';

export default function AdminHome() {
  return (
    <div className='d-flex'>
      <AdminSideBar />
      <div className='p-5'>
        <AllItems />
      </div>
    </div>
  );
}
