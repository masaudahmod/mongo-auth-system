import React from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/userApi";
import EmailVerifyModal from "../components/EmailVerifyModal";

const Profile = () => {
  const { data, isLoading } = useGetUserQuery();

  const userData = data?.data?.user;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("authUser");
  //   window.location.href = "/";
  // };

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
            welcome - {userData?.name}
          </h2>
          <p className="text-xl mb-3 font-mono">Email: {userData?.email}</p>
          <p className="text-xl mb-3 font-mono">
            Pofile Created At: {userData?.createdAt}
          </p>
          <div>
            <p className="text-xl mb-3 font-mono">
              Pofile verify status:{" "}
              {userData?.isEmailVerified ? "Verified" : "Not Verified"}
            </p>
            {!userData?.isEmailVerified && <EmailVerifyModal userEmail={userData?.email}/>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
