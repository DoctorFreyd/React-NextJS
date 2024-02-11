import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { store, wrapper } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changingBy, getAllPosts } from "@/feauters/posts/postsAPI";
import { getPosts } from "@/feauters/posts/postsSlice";

// Types
interface DataType {}
// Get
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}): Promise<any> => {
      const posts = await store.dispatch(getAllPosts()).unwrap();
      store.dispatch(getPosts(posts));
    }
);
// Show
const Posts: React.FC<DataType> = ({}): JSX.Element => {
  // Valibales
  const { posts } = useAppSelector((st) => st.posts);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const dispatch = useAppDispatch();
  console.log(posts, "posts");
  // Show
  return (
    <>
      <div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Welcome to Our Posts
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                There is all posts you can scroll and see what we make for you :
                {`))))`}
              </p>
            </div>
            <div className="flex justify-center m-5">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Limit:
                  </label>
                  <input
                    onChange={(e) => setLimit(Number(e.target.value))}
                    type="text"
                    id="first_number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Limit"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="second_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Skip:
                  </label>
                  <input
                    onChange={(e) => setSkip(Number(e.target.value))}
                    type="text"
                    id="second_number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Skip"
                    required
                  />
                </div>
                <button
                  onClick={() =>
                    dispatch(changingBy({ limit: limit, skip: skip }))
                  }
                  className=" bg-blue-500 hover:bg-blue-400 text-gray-50 font-semibold hover:text-gray-200 py-2 px-4 border border-blue-400 hover:border-transparent rounded"
                >
                  Change
                </button>
              </div>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {posts.map((e) => {
                return (
                  <li key={e.id}>
                    <div className="flex items-center gap-x-6">
                      <Image
                        className="h-16 w-16 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                        width={0}
                        height={0}
                        alt=""
                        loader={() =>
                          "https://cdn-icons-png.flaticon.com/512/21/21104.png"
                        }
                      />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {e.title}
                        </h3>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-500">
                          {e.body}
                        </h3>
                        <button className=" bg-blue-500 hover:bg-blue-400 text-gray-50 font-semibold hover:text-gray-200 py-2 px-4 border border-blue-400 hover:border-transparent rounded">
                          <Link href={"/post/" + e.id}>See More...</Link>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
