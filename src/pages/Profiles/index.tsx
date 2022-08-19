import React, { useState, useEffect } from 'react';
import { Paper, Stack, CardHeader, Divider, Typography, CardContent, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import axios from '../../api/axios';
import CustomAvatar from '../../components/CustomAvatar';

interface Profile {
  _id: string;
  name: string;
  following: string[];
  followers: string[];
}

const Profiles = () => {
  const token = localStorage.getItem("accessToken");
  const actualProfileId = localStorage.getItem("profile");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchResult, setSearchResult] = useState<Profile[]>([]);
  const renderProfiles = searchResult.length > 0 ? searchResult : profiles;

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await axios.get("/profiles", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfiles(response.data);
      } catch (err) {
        toast.error('Ocorreu um erro ao buscar perfis');
      }
    }

    getProfiles();
  }, [token])

  const handleFollow = async (id: string) => {
    try {
      await axios.post(`/profiles/${id}/follow`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newProfiles = profiles.map((profile) => {
        if (profile._id === id) {
          return {
            ...profile,
            followers: [...profile.followers, id],
          };
        } else if (profile._id === actualProfileId) {
          return {
            ...profile,
            following: [...profile.followers, actualProfileId],
          };
        } else {
          return profile;
        }
      });

      searchResult.length > 0 ? (
        setSearchResult(newProfiles.filter((profile) => searchResult.map((p) => p._id).includes(profile._id)))
      ) : setProfiles(newProfiles);
      console.log(searchResult)
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar seguir');
    }
  }

  const findUsers = async (search: string) => {
    try {
      const response = await axios.get(`/profiles/search?q=${search}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSearchResult(response.data);
    } catch (err) {
      toast.error('Ocorreu um erro ao buscar um usuário')
    }
  }

  return (
    <div>
      <Header title='Perfis' />
      <div style={{ margin: "84px 15px 0px 15px", }}>
        <Stack
          direction="column"
          justifyContent="center"
          spacing={6}
          alignItems="stretch"
        >
          <TextField
            variant='outlined'
            placeholder='Procurar um usuário pelo nome...'
            label='Buscar por nome'
            name='userSearch'
            onChange={(e) => findUsers(e.target.value)}
          />
        </Stack>
      </div>
      <div style={{ marginTop: "15px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {renderProfiles.map((profile) => (
            <div key={profile._id}>
              <Paper elevation={0}>
                <CardHeader
                  avatar={<CustomAvatar profileName={profile.name} />}
                  title={profile.name}
                />
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant='body2' color="text.secondary">
                      {profile.followers.length} Seguidores
                    </Typography>
                    <Typography variant='body2' color="text.secondary">
                      Seguindo {profile.following.length} perfis
                    </Typography>
                    <div style={{ width: '300px' }}>
                      <Button variant='contained'
                        sx={{ width: '100%' }}
                        onClick={() => handleFollow(profile._id)}
                      >
                        Seguir
                      </Button>
                    </div>
                  </Stack>
                </CardContent>
              </Paper>
              <Divider />
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default Profiles;
