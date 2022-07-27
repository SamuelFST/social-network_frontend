import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';
import Profiles from './pages/Profiles';

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/create' element={<NewPost />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profiles' element={<Profiles />} />
    </Routes>
  );
}

export default CustomRoutes;
