import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Paper,
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
import Swal from 'sweetalert2';
import { addNewModifier, deleteItemWithID, deleteModifierWithID, getAllModifiers, getItems } from '../../api/adminApi';
// importing table and modal styles from constants folder
import { style, StyledTableCell, StyledTableRow } from '../../constants/table-style';
// Importing validation error messages from constants folder
import Validation from '../../constants/validation';

export default function TeacherTable() {
  const [modifiers, setModifiers] = useState([]);
  const [open, setOpen] = useState(false);
  const [swalShow, setSwalShow] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });

  // Function for add new Modifier
  const addItem = (data) => {
    console.log(data);
    addNewModifier(data).then((res) => {
      handleClose();
      reset();
    })  
  };
  // Function for get all item
  const getModifiers = () => {
    getAllModifiers().then((res) => {
      setModifiers(res);
    })
  };
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
        deleteModifierWithID(id)
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

  useEffect(() => {
    getModifiers();
  }, [open, swalShow]);

  return (
    <div>
      <h2>All Modifiers</h2>
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
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modifiers
              ? modifiers.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{obj.Name}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Price}</StyledTableCell>
                    <StyledTableCell align='center'>
                      <button
                        className='btn btn-primary edit-btn'
                        onClick={() => {
                          // editItem(obj._id);
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
              Add new Modifier
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
                label='Name'
                type='text'
              />
              {errors.Name && <span className='error'>{errors.Name.message}</span>}
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
