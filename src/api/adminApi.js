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
        resolve(res.data.admin);
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

// Delete item with id
export const deleteItemWithID = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${ADMIN_BASE_URL}/delete-item`, { data: { id } })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors);
      });
  });
};

// get item details with id
export const getItemDetailsWithID = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ADMIN_BASE_URL}/get-item-details/${id}`)
      .then((res) => {
        resolve(res.data.item);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
// Edit the item details

export const editItemDetails = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${ADMIN_BASE_URL}/edit-item`, { formData })
      .then((res) => {
        toast.success(res.data.message);
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
// Change availability of item
export const changeAvailability = (status, id) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${ADMIN_BASE_URL}/change-item-status`, { status, id })
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Modifier management
// Add  new modifier
export const addNewModifier = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${ADMIN_BASE_URL}/add-new-modifier`, formData)
      .then((res) => {
        toast.success(res.data.message);
        resolve();
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
        reject();
      });
  });
};

export const getAllModifiers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ADMIN_BASE_URL}/get-modifiers`)
      .then((res) => {
        resolve(res.data.modifiers);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

export const deleteModifierWithID = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${ADMIN_BASE_URL}/delete-modifier`, { data: { id } })
      .then((res) => {
        console.log(res);
        resolve();
      })
      .catch((err) => {
        toast.error(err.response.data.errors);
        reject();
        console.log(err);
      });
  });
};

export const getModifierDetails = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${ADMIN_BASE_URL}/get-modifier-details/${id}`)
      .then((res) => {
        resolve(res.data.modifier);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const editModifier = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${ADMIN_BASE_URL}/edit-modifier`, { formData })
      .then((res) => {
        toast.success(res.data.message);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors)
        reject();
      });
  });
};
