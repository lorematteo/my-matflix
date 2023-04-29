import React, { useCallback, useEffect, useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useSetList from "@/hooks/useSetList";

import { ImageSet, ImageSetPlaceholder } from "@/components/imageSet";
import axios from "axios";
import { useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]

const EditProfile = () => {
  const router = useRouter();
  const { data: currentUser, mutate } = useCurrentUser();

  const { data: sets = [], isLoading } = useSetList();

  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [image, setImage] = useState(currentUser?.image);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setImage(currentUser?.image);
  }, [currentUser]);

  const updateUser = useCallback(async () => {
    if(name !== currentUser?.name || image !== currentUser?.image){
      let response;

      response = await axios.post('/api/update', { name, image });

      const updatedName = response?.data?.name;
      const updatedImage = response?.data?.image;

      mutate({
        ...currentUser,
        name: updatedName,
        image: updatedImage,
      });
    }
    router.push('/profiles');
  }, [name, image, currentUser, router, mutate])

  return (
    <div className="p-20">
      <div className="flex flex-col gap-4 my-10 justify-center items-center sm:justify-normal sm:items-start sm:flex-row">
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-md flex items-center justify-center overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={image} alt="" />
        </div>
        <div className="flex flex-col gap-4 w-72 sm:w-96">
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="
              text-white
              text-xl sm:text-2xl
              h-8
              sm:indent-2
              px-3
              py-6
              bg-[#666]
              focus:outline-none
              mx-6
            "
            placeholder="Name"
          />
          <input
            disabled
            value={email}
            type="mail"
            onChange={(e) => setEmail(e.target.value)}
            id="mail"
            className="
              text-white
              text-xl sm:text-2xl
              h-8
              sm:indent-2
              px-3
              py-6
              bg-[#666]
              focus:outline-none
              mx-6
              opacity-50
            "
            placeholder="Email"
          />
        </div>
      </div>


      <h2 className="text-2xl md:text-4xl text-white mb-8">Select your profile icon :</h2>
      <ImageSet title="Default set" images={images} selectImage={setImage}/>
      {sets.map((set: { id: React.Key | null | undefined; title: string; images: string[]; }) => {
          return (
            <ImageSet key={set.id} title={set.title} images={set.images} selectImage={setImage}/>
          )
      })}
      { isLoading && (
        <ImageSetPlaceholder />
      )}


      <div className="flex">
        <div onClick={updateUser} className="group text-center mt-20">
          <p className='
            bg-white
            text-zinc-900
            border-white
            group-hover:bg-red-600
            group-hover:border-red-600
            border
            text-xl
            px-6 py-2
            group-hover:text-white
            group-hover:cursor-pointer
          '>Save</p>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;