import { LimitAndSkip } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Posts
export const getAllPosts = createAsyncThunk("get/posts", async () => {
  const { data } = await axios.get("https://dummyjson.com/posts");
  console.log(data, "data");
  return data;
});
// Get One Post
export const getOnePost = createAsyncThunk("get/post", async (id: number) => {
  const { data } = await axios.get("https://dummyjson.com/products/" + id);
  return data;
});
// Delete The Post
export const delThePost = createAsyncThunk(
  "delete/post",
  async (id: number) => {
    const { data } = await axios.delete("https://dummyjson.com/posts/" + id);
    return data;
  }
);
// Get All Comments of Post
export const getAllComennts = createAsyncThunk(
  "get/comments",
  async (id: number) => {
    const { data } = await axios.get(
      "https://dummyjson.com/posts/" + id + "/comments"
    );
    return data;
  }
);
// Delete The Comment
export const delTheComment = createAsyncThunk(
  "delete/comment",
  async (id: number) => {
    const { data } = await axios.delete("https://dummyjson.com/comments/" + id);
    return data;
  }
);
// Get Users For a Adding Comment
export const getAllUsers = createAsyncThunk("get/users", async () => {
  const { data } = await axios.get("https://dummyjson.com/users");
  return data;
});
// Changin Skip and Limit
export const changingBy = createAsyncThunk(
  "skip/limit",
  async (obj: LimitAndSkip) => {
    const { data } = await axios.get(
      "https://dummyjson.com/posts?limit=" +
        obj.limit +
        "&skip=" +
        obj.skip +
        "&select=title"
    );
    return data;
  }
);
// Searching
export const searching = createAsyncThunk("searched", async (text: string) => {
  const { data } = await axios.get(
    "https://dummyjson.com/posts/search?q=" + text
  );
  return data;
});
