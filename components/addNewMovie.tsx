import useInfoModal from "@/hooks/useInfoModal";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import InfoModal from "./infoModal";
import MovieCard from "./movieCard";
import WhiteInput from "./whiteInput";

const AddNewMovie = () => {
  const router = useRouter();
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

  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  const getGenres = useCallback(() => {
    let genre = genres.split(',')
    genre.forEach((g, index) =>
      genre[index] = g.trim()
    )
    return genre;
  }, [genres])

  const preview = useMemo(() => ({
    "title": title ? title : "Title",
    "description": description ? description : "Description",
    "release": release ? release : "2018",
    "videoUrl": video,
    "thumbnailUrl": thumbnail ? thumbnail : '/images/hero.jpg',
    "logoUrl": logo ? logo : '/images/logo.png',
    "genre": getGenres(),
    "duration": duration,
    "hd": hd,
  }), [title, description, video, duration, hd, logo, release, thumbnail, getGenres]);

  const sendMovie = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post('/api/admin/addMovie', {data: preview});
      setLoading(false);
      setPublished(true);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }, [preview, router]);
  
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
          <div onClick={sendMovie} className={`
            justify-center
            items-center
            text-center
            text-white
            ${published ? 'bg-green-400' : 'bg-red-600'}
            text-xl
            px-6 py-2
            ${published ? 'hover:bg-green-500' : 'hover:bg-red-700'}
            hover:cursor-pointer
          `}>
          {loading ?
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            :
            <p>{published ? 'Done !' : 'Submit'}</p>
          }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddNewMovie;