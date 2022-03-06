import React from 'react';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import AllModifiers from '../Components/Modifier/Modifier';

function Modifiers() {
  return (
    <div className='d-flex'>
      <AdminSideBar />
      <div className='p-5'>
        <AllModifiers />
      </div>
    </div>
  );
}

export default Modifiers;
