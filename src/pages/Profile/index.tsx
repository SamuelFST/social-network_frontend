import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import logo from '../../assets/logo.svg';
import CustomAvatar from '../../components/CustomAvatar';

const Profile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");

  const handleLogout = async () => {
    toast.info(`Até mais, ${userName}!`, {
      icon: () => <img src={logo} alt="parrot logo" />,
    })
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <Header title='Perfil' />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {userName && <CustomAvatar profileName={userName} />}
          <h1 style={{ marginLeft: '20px' }}>{userName}</h1>
        </div>
        <Button variant='contained' onClick={handleLogout}>
          Sair
        </Button>
      </Box>
    </div>
  );
}

export default Profile;
