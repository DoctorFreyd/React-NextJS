import Link from "next/link";
import React from "react";
import { ReactNode } from "react";
interface DataType {
  children: ReactNode;
}
const Layout: React.FC<DataType> = ({ children }): JSX.Element => {
  return (
    <>
      <header className="bg-blue-200" style={{ height: 75 }}>
        <nav>
          <ul className="grid grid-cols-2 gap-4">
            <li className="text-center text-blue-300 mt-3">
              <Link href="/">
                <button className="bg-transparent hover:bg-indigo-200 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-400 hover:border-transparent rounded">
                  Home
                </button>
              </Link>
            </li>
            <li className="text-center text-blue-300 mt-3">
              <Link href="/posts">
                <button className="bg-transparent hover:bg-indigo-200 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-400 hover:border-transparent rounded">
                  Posts
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
