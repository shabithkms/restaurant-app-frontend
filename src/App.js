import './App.css';
import { Toaster } from 'react-hot-toast';
import {Routes,Route} from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin';
import HomePage from './Pages/AdminHome';
import AddCategory from './Pages/Categories';

function App() {
  return <div className='App'>

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
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='/login' element={<AdminLogin/>}/>
      <Route path='/categories' element={<AddCategory/>}/>
    </Routes>
  </div>;
}

export default App;
