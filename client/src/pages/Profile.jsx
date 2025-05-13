import React from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/userApi";
import EmailVerifyModal from "../components/EmailVerifyModal";
import Loading from "../components/Loading";
import Header from "../components/Header";

const Profile = () => {
  const { data, isLoading } = useGetUserQuery();
  const userData = data?.data?.user;
  const images =
    "https://images.unsplash.com/photo-1587440871875-191322ee64b0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjMyNTh8MHwxfHNlYXJjaHw0fHx1c2Vyc3xlbnwwfHx8fDE3NDcxNjQwNDF8MA&ixlib=rb-4.1.0&q=85";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="bg-slate-700 h-screen">
        <Header />

        <div className="container mx-auto px-4 flex flex-col justify-center items-center gap-10">
          {/* <div className="max-w-3xl min-w-xl mx-auto border text-white rounded p-3">
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
              {!userData?.isEmailVerified && (
                <EmailVerifyModal userEmail={userData?.email} />
              )}
            </div>
          </div> */}
          <div className="container mx-auto px-4 grid grid-cols-2 items-center gap-10  text-white">
            <div className="px-4">
              {" "}
              <h2 className="text-2xl font-semibold mb-6 capitalize">
                {userData?.name}
              </h2>
              <p className="text-xl mb-3 font-serif tracking-wider">
                Email: {userData?.email}
              </p>
              <p className="text-xl mb-3 font-serif tracking-wider">
                Pofile Created At: {userData?.createdAt}
              </p>
              <div>
                <p className="text-xl mb-3 font-serif tracking-wider">
                  Pofile verify status:{" "}
                  {userData?.isEmailVerified ? "Verified" : "Not Verified"}
                </p>
                {!userData?.isEmailVerified && (
                  <EmailVerifyModal userEmail={userData?.email} />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <img className="w-full rounded-b-xl" src={images} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
