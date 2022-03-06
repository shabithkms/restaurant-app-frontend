import React from 'react';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import EditItemDetails from '../Components/AllItems/EditItem';

function EditItem() {
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
