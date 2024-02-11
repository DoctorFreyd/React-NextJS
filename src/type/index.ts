export type Posts = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type Comments = {
  id: number;
  body: string;
  postId: number;
  user: User;
};

export type User = {
  id: number;
  username: string;
};

export type LimitAndSkip = {
  limit: number;
  skip: number;
};

export type AddComment = {
  body: string;
  userId: number;
  postId?: number;
};
