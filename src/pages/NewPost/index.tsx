import React from 'react';
import { TextField, Stack, Container, Button } from '@mui/material';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';

const NewPost = () => {
  return (
    <div>
      <Header title='Nova Postagem' />
      <Container sx={{ marginTop: 12 }}>
        <Stack spacing={6}>
          <TextField
            variant='standard'
            label='Título'
            name='title'
          />
          <TextField
            variant='standard'
            label='O que está acontecendo?'
            name='description'
            multiline
            minRows={3}
          />
          <Dropzone onFileUploaded={() => {}} />
          <Button variant='contained' type='submit'>
            Publicar
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default NewPost;
