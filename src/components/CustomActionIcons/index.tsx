import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "../../api/axios";
import CustomChatBubbleIcon from "../CustomChatBubbleIcon";
import CustomFavoriteIcon from '../CustomFavoriteIcon';

interface Props {
  commentCount: number;
  likeCount: number;
  likes: string[];
  postId: string;
}

const CustomActionIcons = ({
  commentCount, likeCount, likes, postId
}: Props) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likeCount);

  const profile = localStorage.getItem("profile") as string;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (likes.includes(profile)) {
      setLiked(true);
    }
  }, [profile, likes]);

  const handleLike = async () => {
    try {
      if(!liked){
        await axios.post(`/posts/${postId}/like`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          }
        });

        setLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        await axios.post(`/posts/${postId}/unlike`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          }
        });

        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    } catch (err) {
      toast.error('Ocorreu um erro ao reagir ao post');
    }
  }

  return (
    <div>
      <CustomChatBubbleIcon commentCount={commentCount} />
      <CustomFavoriteIcon
        handleLike={handleLike}
        likeCount={likesCount}
        liked={liked}
      />
    </div>
  );
}

export default CustomActionIcons;
