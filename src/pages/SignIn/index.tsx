import { Button, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const SignIn = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <h1>Sign-in</h1>
          <TextField variant="outlined" label="Usuário" />
          <TextField variant="outlined" label="Senha" />
          <Button variant="contained">Log-in</Button>
        </Stack>
      </Container>
    </div>
  );
}

export default SignIn;
