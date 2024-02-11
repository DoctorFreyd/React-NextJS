import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { store, wrapper } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { searching } from "@/feauters/posts/postsAPI";
import { Posts } from "@/type";

// Types
interface DataType {}

// Show
const Home: React.FC<DataType> = ({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { searched } = useAppSelector((st) => st.posts);
  console.log("render");
  console.log(searched);
  const [posts, setPosts] = useState<any>([]);
  const search = async (e: string) => {
    const data = await dispatch(searching(e));
    if (data.payload.posts) {
      setPosts([...data.payload.posts]);
    }
  };
  return (
    <>
      <div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Welcome to Our Website
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Here you can search the post that you want to see :{`))))`}
              </p>
            </div>
            <div className="">
              <input
                onChange={(e) => search(e.target.value)}
                type="text"
                id="first_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
            </div>
            {posts.map((e: any) => {
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
