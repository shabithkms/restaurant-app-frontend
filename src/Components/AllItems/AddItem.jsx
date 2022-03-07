import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField,Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addNewItem, getAllModifiers, getCategory } from '../../api/adminApi';
import Validation from '../../constants/validation';

function AddItem() {
  const [categories, setCategories] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [modifierItem, setModifierItem] = useState([]);

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
    console.log(data);
    // addNewItem(data).then((res) => {});
  };

  const handleChange = (event) => {
    setModifierItem(event.target.value);
  };
  useEffect(() => {
    getModifiers();
    getAllCategory();
  }, [formValues]);
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
              })}
              label=' Price'
              type='number'
            />
            {errors.Price && <span className='error'>{errors.Price.message}</span>}
             {/* Add modifier */}
             <div>
              {/* <FormControl fullWidth className='mt-3'>
                <InputLabel id='demo-simple-select-label'>Modifier</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  {...register('Modifier')}
                  id='demo-simple-select'
                  name='Modifier'
                  label='Modifier'
                  value={modifierItem}
                  onChange={handleChange}
                >
                  {modifiers &&
                    modifiers.map((obj, index) => {
                      console.log(obj);
                      return (
                        <MenuItem key={index} value={obj?.Name || index}>
                          {obj.Name}
                          {` (Rs.${obj.Price})`}
                        </MenuItem>
                      );
                    })}
                </Select>
                <button className='btn btn-primary add-modifier-btn'>Add</button>
              </FormControl> */}
              <h6>Select modifiers :</h6>
              {
                modifiers && modifiers.map((obj)=>(
                  <FormControlLabel control={
                  <Checkbox  />} label={obj.Name}/>
                ))
              }
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
