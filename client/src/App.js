import './App.css';
import {Button} from 'antd';
// import { Toaster } from 'react-hot-toast';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
      <BrowserRouter>
      <h1>My application</h1>
      {/* <Toaster position ='top-center' reverseorder ={false} /> */}
         <Routes>
             <Route path='/login' element = {<Login />} />
             <Route path='/register' element = {<Register />}/>
             <Route path='/' element = {<Home />} />
         </Routes>
      </BrowserRouter>

  );
}

export default App;
