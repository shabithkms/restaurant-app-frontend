import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AdminSideBar from '../Components/AdminSideBar/AdminSideBar';
import AllModifiers from '../Components/Modifier/Modifier';

function Modifiers() {
  let navigate = useNavigate();
  useEffect(() => {
    let admin = localStorage.getItem('admin');
    if (admin) {
      navigate('/modifier');
    } else {
      navigate('/login');
    }
  }, []);
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
