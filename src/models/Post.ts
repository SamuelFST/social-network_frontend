export interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    name: string;
  };
  image: boolean;
  comments:
    | string[]
    | {
        _id: string;
        description: string;
        profile: string;
      }[];
  likes: string[];
}
