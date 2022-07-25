import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Edit as EditIcon,
  Group as GroupIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import CustomIconButton from '../CustomIconButton';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const navigate = useNavigate();

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
