import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import AccountMenu from "./accountMenu";


const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]

const BlackNavbar = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const router = useRouter();

  const defaultImage = images[Math.floor(Math.random() * 4)];

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, [])

  const redirectHome = () => {
    router.push('/');
  }

  return (
    <nav className="w-full fixed z-40 bg-black">
      <div className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        `}>
        <img className="h-4 md:h-7 hover:cursor-pointer" src="/images/logo.png" alt='Logo' onClick={redirectHome}/>

        <div onClick={toggleAccountMenu} className="flex flex-row ml-auto items-center gap-2 cursor-pointer relative">
          <div className="w-6 h-6 md:w-10 md:h-10 rounded-md overflow-hidden">
            <img src={isLoading ? defaultImage : currentUser?.image} alt="Profile" />
          </div>
          <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
          <AccountMenu visible={showAccountMenu}/>
        </div>
      </div>
    </nav>
  )
}

export default BlackNavbar;