import { useRouter } from "next/router";
import React from "react";

import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
  preview?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId, preview }) => {
  const router = useRouter();

  const playVideo = () => {
    if(preview) return;
    router.push(`/watch/${movieId}`);
  }

  return (
    <button 
    onClick={playVideo}
    className="
      bg-white
      rounded-md
      py-1 md:py-2
      px-2 md:px-4
      w-auto
      text-xs lg:text-lg
      font-semibold
      flex
      flex-row
      items-center
      hover:bg-neutral-300
      transition
    ">
      <BsFillPlayFill className="mr-1"/>
      Play
    </button>
  )
}

export default PlayButton;