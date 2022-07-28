import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Divider, TextField, Paper, Button } from "@mui/material";

import { Post } from "../../models/Post";
import axios from "../../api/axios";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard";

const PostDetail = () => {
  const { postId } = useParams();
  const token = localStorage.getItem('accessToken');
  const [post, setPost] = useState<Post>();
  const [comment, setComment] = useState({ value: "", error: "" });

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data);
      } catch (err) {
        toast.error('Não foi possível carregar o post');
      }
    }

    getPost();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/posts/${postId}/comments`,
      { description: comment.value },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setComment({...comment, value: ""});
      post?.comments.push(response.data);
      setPost(post);
    } catch (err) {
      toast.error('Ocorreu um erro ao adicionar um comentário');
    }
  };

  return (
    <div>
      <Header title="Post" />
      <div style={{ marginTop: "56px" }}>
        {post && <PostCard post={post} handlePostClick={() => { }} />}
      </div>
      <Divider />
      <Paper elevation={0} sx={{ marginX: 24, marginTop: 2 }}>
        <form onSubmit={(e) => handleSubmit(e)}>


          <TextField
            id="comment"
            label="Novo comentário"
            variant="standard"
            multiline
            minRows={3}
            fullWidth
            value={comment.value}
            onChange={(e) => setComment({ value: e.target.value, error: "" })}
          />
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end"
          }}>
            <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
              Publicar
            </Button>
          </div>
        </form>
      </Paper >
    </div>
  );
}

export default PostDetail;
