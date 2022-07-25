import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';
import Profiles from './pages/Profiles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/create' element={<NewPost />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profiles' element={<Profiles />} />
      </Routes>
      <ToastContainer autoClose={5000} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
