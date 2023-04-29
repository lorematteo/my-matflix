import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  if(!visible) {
    return null;
  }

  const manageProfiles = () => {
    router.push('/profiles');
  }

  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-3 flex-col border-2 border-gray-800 flex'>
      <div className='flex flex-col'>
        <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
          <img className='w-8 rounded-md' src={currentUser?.image} alt="Profile" />
          <p className='text-white text-base group-hover/item:underline'>
            {currentUser?.name}
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-3' />
        <div onClick={manageProfiles} className='px-3 text-left text-white text-sm hover:underline'>
          Manage profiles
        </div>
        <hr className='bg-gray-600 border-0 h-px my-3' />
        <div onClick={() => {}} className='px-3 text-left text-white text-sm hover:underline'>
          Account
        </div>
        <hr className='bg-gray-600 border-0 h-px my-3' />
        <div onClick={() => signOut()} className='px-3 text-right text-white text-sm hover:underline'>
          Sign out of Netflix
        </div>
      </div>
    </div>
  )
}

export default AccountMenu;