import { DeleteOutline, Edit } from '@mui/icons-material';
import { FormControlLabel, Paper, Switch, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { changeAvailability, deleteItemWithID, getItems } from '../../api/adminApi';
// importing table and modal styles from constants folder
import { StyledTableCell, StyledTableRow } from '../../constants/table-style';
import './AdminHome.css';

export default function TeacherTable() {
  const [items, setItems] = useState([]);
  const [swalShow, setSwalShow] = useState(false);
  const navigate = useNavigate();

  // Function for get all item
  const getAllItems = () => {
    getItems().then((res) => {
      console.log(res.items);
      setItems(res.items);
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
  // Change status of Item
  const handleChange = (e, id) => {
    setSwalShow(true);
    changeAvailability(e.target.checked, id).then((res) => {
      setSwalShow(false);
    });
  };

  useEffect(() => {
    getAllItems();
  }, [swalShow]);

  return (
    <div>
      <h2>All items</h2>
      <div className='mb-3 mt-2 ml-auto'>
        <button className='add-btn btn ' onClick={() => navigate('/add-item')}>
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
              <StyledTableCell align='center'>Modifiers</StyledTableCell>
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Availability</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              ? items.map((obj, index) => (
                  <StyledTableRow key={obj._id}>
                    <StyledTableCell component='th' scope='row'>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{obj.Name}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Category}</StyledTableCell>
                    <StyledTableCell align='center'>{obj.Description}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {obj.Modifiers.length ? obj.Modifiers.map((val) => <li>{val.Name}</li>) : 'None'}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{obj.newPrice}</StyledTableCell>
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
                        <Edit />
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          deleteItem(obj._id);
                        }}
                      >
                        <DeleteOutline />
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
