import React from 'react';
import './Login.css';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Validation from '../../constants/validation';
import { adminLogin } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';

function Login() {
  // React hook form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Admin login function
  const doAdminLogin = (data) => {
    // Call api for admin login
    adminLogin(data).then(() => {
      navigate('/');
    });
  };

  return (
    <div className='main-div container'>
      <div className='login shadow  bg-light rounded col-md-6 '>
        <h1 className='text-center'>Admin Login</h1>
        <form onSubmit={handleSubmit(doAdminLogin)}>
          <TextField
            margin='normal'
            label='Email'
            fullWidth
            {...register('Email', {
              required: Validation.Errors.REQUIRED_ERROR,
              pattern: {
                value: Validation.Patterns.EMAIL_PATTERN,
                message: Validation.Errors.INVALID_EMAIL,
              },
            })}
          />
          {errors.Email && <span className='error'>{errors.Email.message}</span>}

          <TextField
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            {...register('Password', {
              required: Validation.Errors.REQUIRED_ERROR,
              minLength: {
                value: 5,
                message: Validation.MinLength(5),
              },
              maxLength: {
                value: 32,
                message: Validation.MaxLength(32),
              },
            })}
          />
          {errors.Password && <span className='error'>{errors.Password.message}</span>}

          <div className='text-center'>
            <button className='btn login-btn'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
