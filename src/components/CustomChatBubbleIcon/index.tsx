import React from "react";
import { IconButton, Typography } from "@mui/material";
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
} from '@mui/icons-material';

interface Props {
  commentCount: number;
}

const CustomChatBubbleIcon = ({ commentCount }: Props) => {
  return (
    <>
      <IconButton>
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {commentCount}
      </Typography>
    </>
  );
}

export default CustomChatBubbleIcon;
