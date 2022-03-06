import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { editItemDetails, getCategory, getItemDetailsWithID } from '../../api/adminApi';
import Validation from '../../constants/validation';

function EditItem() {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // React hook form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  //   Function for get all categories
  const getAllCategory = () => {
    getCategory().then((res) => {
      setCategories(res.categories);
    });
  };
  // Function for get item details with id
  const getItemDetails = () => {
    getItemDetailsWithID(id).then((res) => {
      setItem(res);
    });
  };
  //   Function for edit item
  const editItem = (data) => {
    data.id = id;
    editItemDetails(data).then((res) => {
      navigate('/');
    });
  };

  useEffect(() => {
    getAllCategory();
    getItemDetails();
  }, []);

  if (!item) {
    return 'Data loading';
  }
  return (
    <div>
      <div className='main-div container'>
        <div className='edit-item shadow  bg-light rounded col-md-6 '>
          <h1 className='text-center'>Edit item</h1>
          <form onSubmit={handleSubmit(editItem)}>
            <TextField
              margin='normal'
              fullWidth
              defaultValue={item?.Name}
              {...register('Name', {
                required: Validation.Errors.REQUIRED_ERROR,
                minLength: {
                  value: 4,
                  message: Validation.MinLength(4),
                },
              })}
              label='Item name'
              type='text'
            />
            {errors.Name && <span className='error'>{errors.Name.message}</span>}
            <FormControl fullWidth className='mt-3'>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue={item?.Category}
                {...register('Category', { required: Validation.Errors.REQUIRED_ERROR })}
                label='select Category'
              >
                {categories ? (
                  categories.map((obj) => (
                    <MenuItem key={obj._id} value={obj.Name}>
                      {obj.Name}
                    </MenuItem>
                  ))
                ) : (
                  <span>No Categories</span>
                )}
              </Select>
              {errors.Category && <span className='error'>{errors.Category.message}</span>}
            </FormControl>
            <TextField
              margin='normal'
              fullWidth
              defaultValue={item?.Description}
              {...register('Description', {
                required: Validation.Errors.REQUIRED_ERROR,
              })}
              label=' Description'
              type='text'
            />
            {errors.Description && <span className='error'>{errors.Description.message}</span>}
            <TextField
              margin='normal'
              name='Price'
              fullWidth
              defaultValue={item?.Price}
              {...register('Price', {
                required: Validation.Errors.REQUIRED_ERROR,
              })}
              label=' Price'
              type='number'
            />
            {errors.Price && <span className='error'>{errors.Price.message}</span>}
            <center>
              <button className='btn login-btn'>Update</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
