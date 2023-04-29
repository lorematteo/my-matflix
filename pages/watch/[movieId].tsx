import React from "react";
import { useRouter } from "next/router";

import useMovie from "@/hooks/useMovie";

import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-4 md:gap-8 bg-black bg-opacity-70">
        <div onClick={() => router.push('/')} className="cursor-pointer p-2 md:pt-3">
          <AiOutlineArrowLeft className="text-white w-5 h-5 md:w-7 md:h-7"/>
        </div>
        <p className="text-white text-sm md:text-2xl font-bold">
          <span className="font-light">
            {'Watching : '}
          </span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
      className="h-full w-full"
      src={data?.videoUrl}>
      </video>
    </div>
  )
}

export default Watch;