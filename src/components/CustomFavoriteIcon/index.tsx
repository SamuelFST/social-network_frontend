import React from "react";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { IconButton, Typography } from "@mui/material";

interface Props {
  handleLike: any;
  liked: boolean;
  likeCount: number;
}

const CustomFavoriteIcon = ({ handleLike, liked, likeCount }: Props) => {
  return (
    <>
      <IconButton onClick={() => handleLike()}>
        {liked ? (
          <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {likeCount}
      </Typography>
    </>
  );
}

export default CustomFavoriteIcon;
