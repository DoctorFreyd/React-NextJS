import { Comments, Post, Posts, User } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

interface DataType {
  posts: Posts[];
  post: Post;
  comments: Comments[];
  users: User[];
  searched: Posts[];
}

const initialState: DataType = {
  posts: [],
  post: {} as Post,
  comments: [],
  users: [],
  searched: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    getPost: (state, action) => {
      state.post = action.payload;
    },
    getComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    getUsers: (state, action) => {
      state.users = action.payload.users;
    },
    changing: (state, action) => {
      state.posts = action.payload.posts;
    },
    searched: (state, action) => {
      state.searched = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.posts,
      };
    },
  },
});

export default postsSlice.reducer;

export const { getPosts, getPost, getComments, getUsers, changing, searched } =
  postsSlice.actions;
