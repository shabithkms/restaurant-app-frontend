import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import AddNewItem from '../Components/AllItems/AddItem';

function AddItem() {
    let navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem('admin');
    if (admin) {
      navigate('/add-item');
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <div className=''>
      <AdminSideBar />
      <div className='p-5'>
        <AddNewItem />
      </div>
    </div>
  );
}

export default AddItem;
