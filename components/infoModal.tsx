import React, { useCallback, useEffect, useState} from "react";

import { AiOutlineClose } from "react-icons/ai";

import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

import PlayButton from "./playButton";
import FavoriteButton from "./favoriteButton";
import isWeeklyNew from "@/lib/isWekklyNew";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

const MuteButton = ({ muted, mute } : { muted: boolean, mute: () => void }) => {
  return (
    <div
      onClick={mute}
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
      {muted? 
      <BiVolumeMute className="w-4 h-4 lg:w-7 lg:h-7 text-white group-hover/item:text-neutral-300" />
      : <BiVolumeFull className="w-4 h-4 lg:w-7 lg:h-7 text-white group-hover/item:text-neutral-300" />
      }
    </div>
  )
}






interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId as string);

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose])

  if(!visible) {
    return null;
  }

  function mute(){
    setMuted((current) => !current);
  }

  return (
    <div 
    className="
      z-50
      transition
      duration-300
      bg-black
      bg-opacity-80
      flex
      justify-center
      items-center
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
    ">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div className={`
          ${isVisible ? 'scale-100' : 'scale-0'}
          transform
          duration-300
          relative
          flex-auto
          bg-zinc-900
          drop-shadow-md
        `}>
          <div className="relative h-96">
            <video
             className="w-full brightness-[60%] object-cover h-full"
             autoPlay
             muted={muted}
             loop
             poster={data?.thumbnailUrl}
             src={data?.videoUrl}>
             </video>
             <div 
             onClick={handleClose}
             className="
              cursor-pointer
              absolute
              top-3
              right-3
              h-10
              w-10
              rounded-full
              bg-black
              bg-opacity-70
              flex
              items-center
              justify-center
             "
             >
              <AiOutlineClose className="text-white" size={20}/>
             </div>
             <div className="absolute bottom-[10%] px-10 w-full">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row items-center justify-between right-0">
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton movieId={data?.id}/>
                  <FavoriteButton movieId={data?.id}/>
                </div>
                <MuteButton muted={muted} mute={mute}/>
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row justify-between">
              <p className="text-green-400 font-semibold text-lg">{isWeeklyNew(data?.createdAt) ? 'New' : ''}<span className="text-white"> {data?.release}</span></p>
              <p className="text-white text-lg">{data?.duration}</p>
            </div>
            <div className="flex flex-row justify-between mt-8">
              <p className="text-white text-lg">{data?.description}</p>
              <div className="flex flex-col gap-2 items-end ml-10">
                {data?.genre?.map((genre:string) => {
                  return (
                    <button className="opacity-60 text-white text-lg transition hover:underline">{genre}</button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default InfoModal;