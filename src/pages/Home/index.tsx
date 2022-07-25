import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Paper, CardHeader, Avatar } from '@mui/material';

import Header from '../../components/Header';
import axios from '../../api/axios';

interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
}

const Home = () => {
  const token = localStorage.getItem("accessToken");

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('/feed', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (err) {
        toast.error('Erro ao buscar postagens');
      }
    }

    getPosts();
  }, [token]);

  return (
    <div>
      <Header title='Home' />
      <h1 style={{ marginTop: "100px" }}>Feed</h1>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <Paper elevation={0}>
              <CardHeader
                avatar={<Avatar>B</Avatar>}
                title={post.title}
              />
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
