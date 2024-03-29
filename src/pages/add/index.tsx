import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
//
//
const Add: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Products>();
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();

  const save = async (obj: Products) => {
    const { data } = await axios
      .post("https://dummyjson.com/products/add", obj)
      .catch((er) => {
        return er.response;
      });
    if (data.message) {
      setError([...data.message]);
      console.log("avelacrec");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-blue-100" style={{ height: 1000 }}>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(save)}
          className="m-20 block max-w-md rounded-lg bg-slate-100 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        >
          {/* <!--Title--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-400 [&:not([data-te-input-placeholder-active])]:"
              placeholder="Title"
              {...register("title", {
                required: "write title",
                pattern: {
                  value: /^[a-zA-Z0-9_ ]*$/,
                  message: "Write Some Text chyortov umnik",
                },
              })}
            />
          </div>
          {errors && (
            <p className="ml-3 text-red-400">{errors.title?.message}</p>
          )}
          {/* <!--Brand--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-400 [&:not([data-te-input-placeholder-active])]:"
              placeholder="Brand"
              {...register("brand", {
                required: "write body",
                pattern: {
                  value: /^[a-zA-Z0-9_ ]*$/,
                  message: "Write Some Text chyortov umnik",
                },
              })}
            />
            {errors && (
              <p className="ml-3 text-red-400">{errors.brand?.message}</p>
            )}
          </div>
          {/* <!--Description--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-400 [&:not([data-te-input-placeholder-active])]:"
              placeholder="Description"
              {...register("description", {
                required: "write body",
                pattern: {
                  value: /^[a-zA-Z0-9_ ]*$/,
                  message: "Write Some Text chyortov umnik",
                },
              })}
            />
            {errors && (
              <p className="ml-3 text-red-400">{errors.description?.message}</p>
            )}
          </div>
          {/* <!--Price--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-400 [&:not([data-te-input-placeholder-active])]:"
              placeholder="Price $"
              {...register("price", {
                required: "write body",
                pattern: {
                  value: /^[a-zA-Z0-9_ ]*$/,
                  message: "Write Some Text chyortov umnik",
                },
              })}
            />
            {errors && (
              <p className="ml-3 text-red-400">{errors.price?.message}</p>
            )}
          </div>
          {/* <!--Image--> */}
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-400 [&:not([data-te-input-placeholder-active])]:"
              placeholder="Image (URL)"
              {...register("images", {
                required: "write body",
                pattern: {
                  value: /^[a-zA-Z0-9_ ]*$/,
                  message: "Write Some Text chyortov umnik",
                },
              })}
            />
            {errors && (
              <p className="ml-3 text-red-400">{errors.images?.message}</p>
            )}
          </div>
          {/* <!--Categories--> */}
          <div>
            <label
              htmlFor="countries"
              className="ml-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >
              Select categori
            </label>
            <select
              id="countries"
              className="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              //   {...register("categories",{required:"select categori"})}
            >
              <option hidden>Choose a categori</option>
              {/* {categories.map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })} */}
            </select>
            {/* {errors && <p className="ml-3 text-red-400">{errors.categories?.message}</p>} */}
          </div>
          {/* <!--Submit button--> */}
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
  );
};

export default Add;
