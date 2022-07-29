import React, { useState, useEffect } from 'react';
import { Paper, Stack, CardHeader, Divider, Typography, CardContent, Button } from '@mui/material';
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
      })
      setProfiles(newProfiles);
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar seguir');
    }
  }

  return (
    <div>
      <Header title='Perfis' />
      <div style={{ marginTop: "72px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {profiles.map((profile) => (
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
