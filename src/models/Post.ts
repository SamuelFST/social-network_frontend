export interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
  image: boolean;
  comments: string[];
  likes: string[];
}
