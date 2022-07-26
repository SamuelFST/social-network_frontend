import React, { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

interface Props {
  commentCount: number;
  likeCount: number;
  likes: string[];
}

const CustomActionIcon = ({ commentCount, likeCount, likes }: Props) => {
  const [liked, setLiked] = useState(false);

  const profile = localStorage.getItem("profile") as string;

  useEffect(() => {
    if (likes.includes(profile)) {
      setLiked(true);
    }
  }, [profile, likes]);

  return (
    <div>
      <IconButton>
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
      <IconButton>
        {liked ? (
          <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {likeCount}
      </Typography>
    </div>
  );
}

export default CustomActionIcon;
