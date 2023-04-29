import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { MdEdit } from 'react-icons/md';

const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]

interface UserCardProps {
  name: string;
  image: string;
  editMode: boolean;
}

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

const UserCard: React.FC<UserCardProps> = ({ name, image, editMode }) => {
  const defaultImage = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={image ? image : defaultImage} alt="" />
          { editMode && (
            <div className="absolute bg-black text-white w-44 h-44 rounded-md items-center justify-center bg-opacity-50 flex">
                <MdEdit size={30}/>
            </div>
          )}
        </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
   </div>
  );
}

const Profiles = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const [editMode, setEditMode] = useState(false);

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);

  const editProfile = useCallback(() => {
    router.push('/profiles/edit');
  }, [router])

  const toggleEditMode = useCallback(() => {
    setEditMode((current) => !current);
  }, []);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-6xl text-white text-center">{!editMode ? "Who's watching ?" : "Edit profile :"}</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => {!editMode ? selectProfile() : editProfile()}}>
            <UserCard name={currentUser?.name} image={currentUser?.image} editMode={editMode}/>
          </div>
        </div>
        <div onClick={toggleEditMode} className="group flex text-center mt-20">
          <p className={`
            ${!editMode ?
                'bg-transparent text-gray-400 border-gray-400 group-hover:border-white' 
                : 'bg-white text-zinc-900 border-white group-hover:bg-red-600 group-hover:border-red-600'
            }
            border
            text-xl
            px-6 py-2
            group-hover:text-white
            group-hover:cursor-pointer
          `}>{!editMode ? 'Edit my profile' : 'Finished'}</p>
        </div>
      </div>
    </div>
  )
}

export default Profiles;