import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="flex items-center justify-between px-3 rounded-md shadow-2xl py-5 max-w-3xl mx-auto gap-10 bg-slate-500">
        <h2 className="text-3xl text-center text-red-50  font-bold capitalize">
          this is home page
        </h2>
        <Link
          to="/profile"
          className="text-xl font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded "
        >
          Profile
        </Link>
      </div>
    </section>
  );
};

export default Home;
