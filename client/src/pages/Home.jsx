import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <section className="bg-slate-300 h-screen overflow-hidden">
      <Header />
      <div className="w-full h-full object-cover">
        <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NjMyNTh8MHwxfHNlYXJjaHwyfHx0ZWNofGVufDB8fHx8MTc0NzE2NDIzMXww&ixlib=rb-4.1.0&q=85"  className="w-full h-full" alt="" />
      </div>
    </section>
  );
};

export default Home;
