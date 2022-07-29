import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Stack, Container, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import axios from '../../api/axios';
import logo from '../../assets/logo.svg';

const NewPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { title, description } = formData;
    const data = new FormData();

    data.append("title", title);
    data.append("description", description);

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      await axios.post('/posts', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Post criado com sucesso!', {
        icon: () =>  <img src={logo} alt="parrot logo"/>,
      });

      navigate("/home");
    } catch (err) {
      toast.error('Ocorreu um erro ao criar o Post');
    }
  }

  return (
    <div>
      <Header title='Nova Postagem' />
      <Container sx={{ marginTop: 12 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <TextField
              variant='standard'
              label='Título'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
            />
            {selectedFile ? null : (
              <TextField
                variant='standard'
                label='O que está acontecendo?'
                name='description'
                multiline
                minRows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            )}
            <Dropzone onFileUploaded={setSelectedFile} />
            <Button variant='contained' type='submit'>
              Publicar
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
}

export default NewPost;
