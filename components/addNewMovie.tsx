import useInfoModal from "@/hooks/useInfoModal";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import InfoModal from "./infoModal";
import MovieCard from "./movieCard";
import WhiteInput from "./whiteInput";

const AddNewMovie = () => {
  const { isOpen, closeModal } = useInfoModal();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] =  useState("");
  const [duration, setDuration] = useState("");
  const [release, setRelease] = useState("");
  const [genres, setGenres] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [logo, setLogo] = useState("");
  const [hd, setHd] = useState(true);

  const getGenres = () => {
    let genre = genres.split(',')
    genre.forEach((g, index) =>
      genre[index] = g.trim()
    )
    return genre;
  }

  const preview = {
    "id": "",
    "title": title ? title : "Title",
    "description": description ? description : "Description",
    "release": release ? release : "2018",
    "videoUrl": video,
    "thumbnailUrl": thumbnail ? thumbnail : '/images/hero.jpg',
    "logoUrl": logo ? logo : '/images/logo.png',
    "genre": getGenres(),
    "duration": duration ? duration : "2h20",
    "hd": hd,
    "createdAt": ""
  }
  
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} previewData={preview}/>
    <div className="flex flex-col gap-4 md:flex-row md:gap-0">
      <h2 className="text-xl text-gray-400 uppercase w-full sm:w-[40%]">Add a new movie</h2>
      <div className="flex flex-col w-full gap-4">
        <WhiteInput label="Title" placeholder="Movie name" value={title} onChange={setTitle} />
        <WhiteInput label="Description" placeholder="Short movie synopsis" value={description} onChange={setDescription} multiline={3}/>
        <WhiteInput label="Movie" placeholder="Direct video link (.mp4, .mov, .m4v ..)" value={video} onChange={setVideo} />
        <WhiteInput label="Duration" placeholder="2h20" value={duration} onChange={setDuration} />
        <WhiteInput label="Release" placeholder="2018" value={release} onChange={setRelease} />
        <WhiteInput label="Genre" placeholder="Separate genres by a comma : Adventure, Action, Mystery" value={genres} onChange={setGenres} />
        <WhiteInput label="Thumbnail" placeholder="Thumbnail direct url (.jpeg, .jpg)" value={thumbnail} onChange={setThumbnail} />
        <WhiteInput label="Logo" placeholder="Logo direct url (.png)" value={logo} onChange={setLogo} />
        <div className="flex flex-row items-center gap-4 w-full">
          <label className="w-24 text-right shrink-0">Quality</label>
          <div className="flex flex-row w-full items-center justify-between">
          {hd ? 
            <div className="
              flex flex-row
              items-center
            text-gray-600
              text-sm sm:text-base
              h-8
              sm:indent-2
              px-1
              border
            border-gray-300
            ">
              <AiOutlineCheck />
              HD
            </div>
          :
            <div className="
              flex flex-row
              items-center
            text-gray-600
              text-sm sm:text-base
              h-8
              sm:indent-2
              px-1
              border
            border-gray-300
            ">
              <AiOutlineCheck />
              None
            </div>
          }
          <p className="text-blue-500 text-xs sm:text-sm underline hover:cursor-pointer"
          onClick={() => setHd((current) => !current)}>
            {hd ? "Not in HD ?" : "In HD ?"}
          </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 w-full mt-8">
          <label className="w-24 text-right mt-1 shrink-0">Preview</label>
          <div className="flex bg-zinc-900 w-full py-4 items-center justify-between">
            <div className="mx-auto">
              <MovieCard data={preview} preview/>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <div onClick={() => {}} className="group text-center">
            <p className='
              text-white
              bg-red-600
              text-xl
              px-6 py-2
              group-hover:bg-red-700
              group-hover:cursor-pointer
            '>Submit</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddNewMovie;