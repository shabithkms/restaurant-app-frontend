import axios from 'axios';
import toast from 'react-hot-toast';

const ADMIN_BASE_URL = `${process.env.REACT_APP_BASE_URL}/admin`;

// Admin login
export const adminLogin = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/login`, formData)
      .then((res) => {
        console.log(res.data.admin);
        resolve(res);
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
        reject(err);
      });
  });
};

// Add new category
export const addNewCategory = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/add-category`, formData)
      .then((res) => {
        toast.success(res.data.message);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors);
        reject(err);
      });
  });
};

// Get all categories
export const getCategory = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ADMIN_BASE_URL}/get-all-categories`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

// Delete category
export const deleteCategoryWithID = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    axios
      .delete(`${ADMIN_BASE_URL}/delete-category`, { data: { id } })
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

// Add new item
export const addNewItem = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/add-new-item`, formData)
      .then((res) => {
        toast.success(res.data.message);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors);
        reject();
      });
  });
};

// Get all items
export const getItems = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ADMIN_BASE_URL}/get-all-items`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
