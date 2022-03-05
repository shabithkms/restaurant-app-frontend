import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addNewItem, getCategory, getItems } from '../../api/adminApi';
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      setItems(res.items)
    });
  };
  // Function for get all categories
  const getAllCategory = () => {
    getCategory().then((res) => {
      setCategories(res.categories);
    });
  };

  useEffect(() => {
    getAllCategory();
    getAllItems();
  }, [open]);

  return (
    <div>
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
                    <StyledTableCell align='center'>
                      <button className='btn btn-danger' onClick={() => {}}>
                        Delete
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
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
    </div>
  );
}
