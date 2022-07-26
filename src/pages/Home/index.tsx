import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import PostCard from '../../components/PostCard';
import axios from '../../api/axios';
import { Divider } from '@mui/material';

import { Post } from '../../models/Post';

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
      <div style={{ marginTop: "56px" }}>
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
