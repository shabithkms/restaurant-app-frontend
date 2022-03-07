import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/AdminHome';
import AdminLogin from './Pages/AdminLogin';
import AddCategory from './Pages/Categories';
import EditItem from './Pages/EditItem';
import Modifiers from './Pages/Modifiers';
import AddItem from './Pages/AddItem';

function App() {
  return (
    <div className='App'>
      {/* React hot toast */}
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: 'black',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/add-item' element={<AddItem />} />
        <Route exact path='/edit-item/:id' element={<EditItem />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/categories' element={<AddCategory />} />
        <Route path='/modifier' element={<Modifiers />} />
      </Routes>
    </div>
  );
}

export default App;
