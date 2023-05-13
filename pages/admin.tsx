import AddNewMovie from "@/components/addNewMovie";
import BlackNavbar from "@/components/blackNavbar";
import useCurrentUser from "@/hooks/useCurrentUser";

const AdminPanel = () => {
  const { data: currentUser } = useCurrentUser();

  if(currentUser?.role === 'user'){
    throw new Error('You need to be admin');
  };

  return (
    <>
    <BlackNavbar />
    <div className="flex flex-col items-center bg-[#f3f3f3] scroll-smooth pt-20 md:pt-24 pb-40">
      <div className="flex flex-col w-[90%] lg:w-[80%] xl:w-[65%] mx-auto my-8">
        <h1 className="text-2xl md:text-3xl text-gray-800">Admin Panel</h1>
        <hr className='bg-gray-400 border-0 h-px my-3' />
        <AddNewMovie />
      </div>
    </div>
    </>
  );
}

export default AdminPanel;