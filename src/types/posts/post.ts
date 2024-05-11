export interface Post {
  id: number;
  title: string;
  description: string;
  userId: number;
  username: string;
}

export interface CreatePostData {
  title: string;
  description: string;
}

export interface UpdatePostData extends CreatePostData {}
