import React, { ReactElement } from 'react';
import { IconButton } from '@mui/material';

interface Props {
  children: ReactElement;
  label: string;
  onClickCallback: any;
}

const CustomIconButton = ({ children, label, onClickCallback }: Props) => {
  return (
    <IconButton
      size='large'
      aria-label={label}
      color='inherit'
      onClick={() => onClickCallback()}
    >
      {children}
    </IconButton>
  );
};

export default CustomIconButton;
