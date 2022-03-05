import {
    Backdrop,
    Box,
    Fade,
    Modal,
    Paper,
    Table,
    TableBody, TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// Importing api from api folder
import { addNewCategory, deleteCategoryWithID, getCategory } from '../../api/adminApi';
// importing table and modal styles from constants folder
import { style, StyledTableCell, StyledTableRow } from '../../constants/table-style';


function Categories() {
  const [categories, setCategories] = useState([]);
  const [swalShow, setSwalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });

  //   Function for add category
  const addCategory = (data) => {
    addNewCategory(data)
      .then((res) => {
        console.log('added');
        handleClose();
        reset();
      })
      .catch((err) => {
        reset();
      });
  };
  // Function for getall category
  const getAllCategory = () => {
    getCategory()
      .then((res) => {
        console.log(res);
        setCategories(res.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   Function for delete category with id
  const deleteCategory = (id) => {
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
        deleteCategoryWithID(id).then((res) => {
          console.log(res);
          setSwalShow(false);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  };

  useEffect(() => {
    getAllCategory();
  }, [open, swalShow]);

  return (
    <div>
      <div>
        <h2>All categories</h2>
      </div>
      <div className='mb-3 mt-2 d-flex '>
        <div className='addStudent-btn'>
          <button className='add-btn btn' onClick={handleOpen}>
            Add new
          </button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              ? categories.map((obj, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{obj.Name}</StyledTableCell>
                    <StyledTableCell align='center'>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          deleteCategory(obj._id);
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
          <Box sx={style} className='container '>
            <Typography id='transition-modal-title' variant='h3' align='center' component='h1' fontWeight={'500'}>
              Add new Category
            </Typography>
            <form onSubmit={handleSubmit(addCategory)}>
              <TextField
                margin='normal'
                fullWidth
                {...register('Name', {
                  required: 'This field is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum 4 characters required',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum 20 characters allowed',
                  },
                })}
                label='Name'
                type='Text'
                id='Name'
              />
              {errors.Name && <span className='error'>{errors.Name.message}</span>}

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

export default Categories;
