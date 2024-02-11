import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { wrapper } from "@/app/store";
import { GetServerSideProps } from "next";
import {
  delTheComment,
  delThePost,
  getAllComennts,
  getAllUsers,
  getOnePost,
} from "@/feauters/posts/postsAPI";
import { getComments, getPost, getUsers } from "@/feauters/posts/postsSlice";
import { AddComment, Comments } from "@/type";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

// Getting Data
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }): Promise<any> => {
    // get post
    const post = await store.dispatch(getOnePost(Number(params?.id))).unwrap();
    store.dispatch(getPost(post));
    // get comments
    const comments = await store
      .dispatch(getAllComennts(Number(params?.id)))
      .unwrap();
    store.dispatch(getComments(comments));
    // get users
    const users = await store.dispatch(getAllUsers()).unwrap();
    store.dispatch(getUsers(users));
  });
// Show
const Post: React.FC = (): JSX.Element => {
  // Valibales
  const { post, comments, users } = useAppSelector((st) => st.posts);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddComment>();
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();
  // Functions
  const save = async (obj: AddComment) => {
    obj.postId = post.id;
    if (obj.postId) {
      const { data } = await axios
        .post("https://dummyjson.com/comments/add", obj)
        .catch((er) => {
          return er.response;
        });
      if (data.message) {
        setError([...data.message]);
        console.log("avelacrec");
      } else {
        router.push("/");
      }
    }
  };
  console.log(comments);
  console.log(post);
  console.log(users, "User Info");
  return (
    <div>
      <div className="flex justify-center m-5">
        <div>
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={post.images[0]}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {post.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {post.price}$
            </p>
            <button
              onClick={() => dispatch(delThePost(post.id))}
              className=" bg-red-500 hover:bg-red-400 text-gray-50 font-semibold hover:text-gray-200 py-2 px-4 border border-red-400 hover:border-transparent rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <p className="text-center m-5 mb-2 text-2xl font-bold tracking-tight text-indigo-700 dark:text-white">
        Comments
      </p>
      <div className="grid grid-cols-2 ml-5">
        {comments.map((e) => {
          return (
            <div
              key={e.id}
              className="bg-blue-400 m-2 hover:bg-indigo-400 text-gray-50 font-semibold hover:text-gray-200 py-2 px-4 border border-blue-400 hover:border-transparent rounded"
            >
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">
                @{e.user.username}
              </h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {e.body}
              </p>
              <button
                onClick={() => dispatch(delTheComment(e.id))}
                className=" bg-red-500 hover:bg-red-400 text-gray-50 font-semibold hover:text-gray-200 py-2 px-4 border border-red-400 hover:border-transparent rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="bg-blue-100" style={{ height: 450 }}>
        <p className="text-center m-5 mb-2 text-2xl font-bold tracking-tight text-indigo-700 dark:text-white">
          Add Comment
        </p>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(save)}
            className="m-20 block max-w-md rounded-lg bg-slate-100 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
          >
            {/* <!--Body--> */}
            {errors && (
              <p className="ml-3 text-red-400">{errors.body?.message}</p>
            )}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-400 [&:not([data-te-input-placeholder-active])]:"
                placeholder="Your Comment..."
                {...register("body", {
                  required: "write comment",
                  pattern: {
                    value: /^[a-zA-Z0-9_ ]*$/,
                    message: "Write Some Text",
                  },
                })}
              />
            </div>
            {/* <!--Users--> */}
            {errors && (
              <p className="ml-3 text-red-400">{errors.userId?.message}</p>
            )}
            <div>
              <label
                htmlFor="users"
                className="ml-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >
                Choose The User
              </label>
              <select
                id="users"
                className="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("userId", { required: "Choose The User" })}
              >
                <option hidden className="text-neutral-500">
                  Choose a User
                </option>
                {users.map((e) => {
                  return (
                    <option
                      className="text-neutral-500"
                      value={Number(e.id)}
                      key={e.id}
                    >
                      {e.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="inline-block mt-5 w-full rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
