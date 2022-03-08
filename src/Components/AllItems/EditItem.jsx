import { FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel, Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { editItemDetails, getCategory, getItemDetailsWithID, getAllModifiers } from '../../api/adminApi';
import Validation from '../../constants/validation';

function EditItem() {
  const [categories, setCategories] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [modifierItem, setModifierItem] = useState([]);
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
    data.newModifiers = modifierItem;
    editItemDetails(data).then((res) => {
      navigate('/');
    });
  };

  // get all Modifiers
  const getModifiers = () => {
    getAllModifiers().then((res) => {
      setModifiers(res);
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
    getAllCategory();
    getModifiers();
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
            <div>
              {item.Modifiers.length? <h6>Modifiers already have:</h6>:''}
              {item.Modifiers.map((obj, index) => (
                <FormControlLabel
                  key={index}
                  checked={true}
                  disabled={true}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        handleChange(e, obj._id);
                        console.log(obj._id);
                      }}
                    />
                  }
                  label={`${obj.Name}`}
                />
              ))}
              <h6>Select new modifiers :</h6>
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
