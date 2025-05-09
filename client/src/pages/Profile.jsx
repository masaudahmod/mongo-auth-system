import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.location.href = "/";
  };

  return (
    <>
      <section className="bg-slate-700 flex flex-col gap-5 justify-center items-center min-h-screen">
        <Link
          to="/"
          className="text-xl font-semibold border hover:bg-black hover:text-white transition duration-300 px-2 py-1 rounded "
        >
          Home
        </Link>
        <div className="max-w-3xl min-w-xl mx-auto border text-white rounded p-3">
          <h2 className="text-2xl font-semibold mb-6 capitalize">
            welcome - {user?.name}
          </h2>
          <p className="text-xl mb-3 font-mono">Email: {user?.email}</p>
          <p className="text-xl mb-3 font-mono">
            Pofile Created At: {user?.createdAt}
          </p>
          <p className="text-xl mb-3 font-mono">
            Pofile verify status:{" "}
            {user?.isEmailVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </section>
    </>
  );
};

export default Profile;
