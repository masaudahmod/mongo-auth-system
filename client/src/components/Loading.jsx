import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-[spin_1.5s_linear_infinite] border-white border-t-transparent"></div>
        <p className="text-white text-xl font-mono">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
