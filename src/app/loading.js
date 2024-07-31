"use client";

import { Comment } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-[100vh] w-[100vw] grid place-items-center">
      <Comment backgroundColor="black" />
    </div>
  );
};
export default Loading;
