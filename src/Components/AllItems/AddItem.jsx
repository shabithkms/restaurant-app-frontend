import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { addNewItem, getAllModifiers, getCategory } from '../../api/adminApi';
import Validation from '../../constants/validation';

function AddItem() {
  const [categories, setCategories] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [modifierItem, setModifierItem] = useState([]);
  const navigate = useNavigate();

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
  const getModifiers = () => {
    getAllModifiers().then((res) => {
      setModifiers(res);
    });
  };
  // Function for add item
  const addItem = (data) => {
    data.Modifiers = modifierItem;
    console.log(data);
    addNewItem(data).then((res) => {
      navigate('/');
    });
  };
  // Handle modifiers
  const handleChange = (e, id) => {
    console.log(e.target.checked);
    let value = e.target.checked;
    let added = [...modifierItem];
    if (value) {
      added.push(id);
    } else if (!value) {
      if (added.includes(id)) {
        let index = added.indexOf(id);
        added.splice(index, 1);
      }
    }
    setModifierItem(added);
    console.log(added);
  };
  useEffect(() => {
    getModifiers();
    getAllCategory();
  }, []);
  return (
    <div>
      <div className='main-div container'>
        <div className='edit-item shadow  bg-light rounded col-md-6 '>
          <h1 className='text-center'>Add item</h1>
          <form onSubmit={handleSubmit(addItem)}>
            <TextField
              margin='normal'
              fullWidth
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
                {...register('Category', { required: Validation.Errors.REQUIRED_ERROR })}
                label=' Category'
              >
                {categories &&
                  categories.map((obj) => (
                    <MenuItem key={obj._id} value={obj.Name}>
                      {obj.Name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.Category && <span className='error'>{errors.Category.message}</span>}
            </FormControl>
            <TextField
              margin='normal'
              fullWidth
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
              {...register('Price', {
                required: Validation.Errors.REQUIRED_ERROR,
                min: {
                  value: 1,
                  message: Validation.Min(1),
                },
              })}
              label=' Price'
              type='number'
            />
            {errors.Price && <span className='error'>{errors.Price.message}</span>}
            {/* Add modifier section */}
            <div>
              <h6>Select modifiers :</h6>
              {modifiers &&
                modifiers.map((obj, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          handleChange(e, obj._id);
                        }}
                      />
                    }
                    label={`${obj.Name}`}
                  />
                ))}
            </div>
            {/* End of add modifier */}
            <center>
              <button className='btn login-btn'>Add</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
