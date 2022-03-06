import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { addNewItem, changeAvailability, deleteItemWithID, getCategory, getItems } from '../../api/adminApi';
// importing table and modal styles from constants folder
import { style, StyledTableCell, StyledTableRow } from '../../constants/table-style';
// Importing validation error messages from constants folder
import Validation from '../../constants/validation';
import './AdminHome.css';

export default function TeacherTable() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
  // const [checked, setChecked] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Function for add new Item
  const addItem = (data) => {
    console.log(data);
    addNewItem(data).then((res) => {
      handleClose();
    });
  };
  // Function for get all item
  const getAllItems = () => {
    getItems().then((res) => {
      setItems(res.items);
    });
  };
  // Function for get all categories
  const getAllCategory = () => {
    getCategory().then((res) => {
      setCategories(res.categories);
    });
  };
  // Delete item with ID
  const deleteItem = (id) => {
    setSwalShow(true);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemWithID(id)
          .then((res) => {
            setSwalShow(false);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((err) => {
            setSwalShow(false);
          });
      }
    });
  };
  const handleChange = (e, id) => {
    setSwalShow(true);
    changeAvailability(e.target.checked, id).then((res) => {
      setSwalShow(false);
    });
  };

  useEffect(() => {
    getAllCategory();
    getAllItems();
  }, [open, swalShow]);

  return (
    <div>
      <h2>All items</h2>
      <div className='mb-3 mt-2 ml-auto'>
        <button className='add-btn btn ' onClick={handleOpen}>
          Add new
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Category</StyledTableCell>
              <StyledTableCell align='center'>Description</StyledTableCell>
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Availability</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              ? items.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{obj.Name}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Category}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Description}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Price}</StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={obj.isAvailable}
                            onChange={(e) => {
                              handleChange(e, obj._id);
                            }}
                          />
                        }
                        label={obj.isAvailable ? 'available' : 'not available'}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <button
                        className='btn btn-primary edit-btn'
                        onClick={() => {
                          navigate(`/edit-item/${obj._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          deleteItem(obj._id);
                        }}
                      >
                        Delete
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal for add new item */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='container ' onSubmit={handleSubmit(addItem)}>
            <Typography id='transition-modal-title' variant='h3' align='center' component='h1' fontWeight={'500'}>
              Add new Item
            </Typography>
            <form>
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
                {...register('Description', {
                  required: Validation.Errors.REQUIRED_ERROR,
                })}
                label=' Description'
                type='text'
              />
              {errors.Description && <span className='error'>{errors.Description.message}</span>}
              <TextField
                margin='normal'
                fullWidth
                {...register('Price', {
                  required: Validation.Errors.REQUIRED_ERROR,
                })}
                label=' Price'
                type='number'
              />
              {errors.Price && <span className='error'>{errors.Price.message}</span>}
              <center>
                <button className='btn login-btn'>Add</button>
              </center>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* End of modal for add new item */}

      {/* Modal for edit item */}
    </div>
  );
}
