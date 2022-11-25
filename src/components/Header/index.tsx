import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

import {
  Home as HomeIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import CustomIconButton from '../CustomIconButton';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [messageCount, setMessageCount] = useState(0);

  const socket = io("http://localhost:4000/v1", {
    auth: { token },
    secure: true,
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket);
    });

    socket.on("connect_profile", (profile) => {
      console.log(profile);
    });

    socket.on("disconnect", () => {
      toast.error('A conexão foi perdida');
    });

    socket.on("post", (data) => {
      toast.info(`${data.profile.name} criou um novo Post`);
      setMessageCount((count) => count + 1);
    });

    socket.on("post-like", (data) => {
      toast.info(`${data} curtiu seu Post`);
      setMessageCount((count) => count + 1);
    });

    socket.on("comment", (data) => {
      toast.info(`${data} comentou no seu Post`);
      setMessageCount((count) => count + 1);
    });

    socket.on("comment-like", (data) => {
      toast.info(`${data} curtiu seu comentário`);
      setMessageCount((count) => count + 1);
    });

    socket.on("connect_error", (err) => {
      toast.error('Não foi possível estabelecer conexão');
    });

    return () => {
      socket.off();
    };
  }, [token, socket]);

  const handleClickEmail = () => {
    if (messageCount) {
      setMessageCount(0);
      window.location.reload();
    }
  };


  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { cs: "none", sm: "block" } }}
          >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <CustomIconButton label='show home' onClickCallback={() => navigate('/home')}>
            <HomeIcon />
          </CustomIconButton>
          <CustomIconButton label='notifications' onClickCallback={handleClickEmail}>
            <Badge badgeContent={messageCount} color="secondary">
              <MailIcon />
            </Badge>
          </CustomIconButton>
          <CustomIconButton label='show edit' onClickCallback={() => navigate('/create')}>
            <EditIcon />
          </CustomIconButton>
          <CustomIconButton label='show profiles' onClickCallback={() => navigate('/profiles')}>
            <GroupIcon />
          </CustomIconButton>
          <CustomIconButton label='show profile' onClickCallback={() => navigate('/profile')}>
            <AccountCircleIcon />
          </CustomIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
