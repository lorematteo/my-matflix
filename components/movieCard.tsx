import React from "react";
import { useRouter } from "next/router";

import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import FavoriteButton from "./favoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import isWeeklyNew from "@/lib/isWekklyNew";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({
  data
}) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const watchMovie = () => {
    router.push(`/watch/${data?.id}`)
  };

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw] flex justify-center items-center">
      <div onClick={watchMovie}>
        <img 
        className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-[12vw]
        "
        src={data.thumbnailUrl}
        alt="Thumbail" />
      </div>
      <div
      className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:opacity-100
      ">
        <div onClick={watchMovie}>
          <img
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounder-t-md
            w-full
            h-[12vw]
          "
          src={data.thumbnailUrl} alt="Thumbnail" />
        </div>
        <div
        className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
        ">

          <div className="flex flex-row items-center gap-3">
            <div
            className="
              cursor-pointer
              w-6
              h-6
              lg:w-10
              lg:h-10
              bg-white
              rounded-full
              flex
              justify-center
              items-center
              transition
              hover:bg-neutral-300
            "
            onClick={watchMovie}>
              <BsFillPlayFill className="w-4 h-4 lg:w-7 lg:h-7"/>
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
            onClick={() => openModal(data?.id)}
            className="
              cursor-pointer
              ml-auto
              group/item
              w-6 h-6
              lg:w-10 lg:h-10
              border-white
              border-2
              rounded-full
              flex
              justify-center
              items-center
              transition
              hover:border-neutral-300"
            >
              <BiChevronDown
              className="w-4 h-4 lg:w-7 lg:h-7 text-white group-hover/item:text-neutral-300"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-green-400 font-semibold mt-4 text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">
              {isWeeklyNew(data?.createdAt) ? 'New ' : ''}<span className="text-white">{data.title}, {data.release}</span>
            </p>
            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
            </div>
          </div>

          <div className="flex flex-row mt-4 gap-2 items-center">
            {data.genre.map((genre:string) => {
              return (
                <p className="text-white text-[10px] md:text-xs xl:text-sm 2xl:text-base opacity-80">{genre}</p>
              )
            })}
          </div>
        </div>
      </div>
      <img
      className="
        absolute
        flex
        w-3/4
        h-1/2
        object-scale-down
        pointer-events-none
      "
      src={data.logoUrl}
      alt="Logo"
      />
    </div>
  )
}

export default MovieCard;