import React, { useState } from "react";
import { Button, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

interface Props {
  onSubmitForm: any;
  onSubmitButtonText: string;
  onRouteLink: string;
  onRouteText: string;
}

const AuthForm = ({
  onSubmitForm,
  onSubmitButtonText,
  onRouteLink,
  onRouteText
}: Props) => {
  const [user, setUser] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitForm(user.value, password.value);
  }

  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={(e) => {handleSubmit(e)}}>
          <Stack
            direction="column"
            justifyContent="center"
            spacing={6}
            alignItems="center"
          >
            <img src={logo} alt="Logo" className='logo' />
            <Stack
              direction="column"
              justifyContent="center"
              spacing={6}
              alignItems="stretch"
            >
              <TextField
                variant='outlined'
                label='Usuário'
                name='user'
                value={user.value}
                onChange={(e) => setUser({ value: e.target.value, error: "" })}
              />
              <TextField
                variant='outlined'
                label='Senha'
                type='password'
                value={password.value}
                onChange={(e) => setPassword({ value: e.target.value, error: "" })}
              />
              <Button variant='contained' type='submit'>{onSubmitButtonText}</Button>
            </Stack>
            <Link to={onRouteLink}>{onRouteText}</Link>
          </Stack>
        </form>
      </Container>
    </div>
  );
}

export default AuthForm;
