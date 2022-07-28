import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import PostCard from '../../components/PostCard';
import { Post } from '../../models/Post';

import axios from '../../api/axios';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`/feed?page=${page}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setHasMore(response.data.length > 0);
        setPosts([...posts, ...response.data]);
      } catch (err) {
        toast.error('Erro ao buscar postagens');
      }
    }

    getPosts();
  }, [token, page]);

  const loadMorePosts = async () => {
    setPage(page + 1);
  }

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  }

  return (
    <div>
      <Header title='Home' />
      <div style={{ marginTop: "56px" }}>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<h4>Carregando mais postagens...</h4>}
        >
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                <PostCard post={post} handlePostClick={handlePostClick} />
                <Divider />
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
