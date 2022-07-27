import React from 'react';
import {
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from '@mui/material';

import CustomAvatar from '../CustomAvatar';
import CustomActionIcon from '../CustomActionIcons';
import { Post } from '../../models/Post';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Paper elevation={0} sx={{ marginX: 24 }}>
      <CardHeader
        avatar={<CustomAvatar profileName={post.profile.name} />}
        title={post.title}
      />
      {post.image ? (
        <CardMedia component="img" image={post.description} alt={post.title} />
      ) : (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "start",
        }}>
          <CustomActionIcon
            commentCount={post.comments.length}
            likeCount={post.likes.length}
            likes={post.likes}
            postId={post._id}
          />
        </div>
      </CardActions>
    </Paper>
  );
}

export default PostCard;
