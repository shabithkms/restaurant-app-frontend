import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import EditItemDetails from '../Components/AllItems/EditItem';

function EditItem() {
  let navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/login');
    }
  }, []);
  return (
    <div className=''>
      <AdminSideBar />
      <div className='p-5'>
        <EditItemDetails />
      </div>
    </div>
  );
}

export default EditItem;
