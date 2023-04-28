import ContentLoader from "react-content-loader";

interface ImageSetProps {
  title: string;
  images: string[];
  selectImage: React.Dispatch<any>;
}

const ImageSet: React.FC<ImageSetProps> = ({ title, images, selectImage }) => {
  return (
    <div className="my-8">
      <p className="text-gray-400 text-xl m-2">{title}</p>
      <div className="grid xl:grid-cols-8 lg:grid-cols-6 sm:grid-cols-6 grid-cols-4 gap-4">
        {images.map((image, index) => {
          return (
            <div onClick={() => selectImage(image)} key={index} className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-md flex items-center justify-center border-2 border-transparent hover:cursor-pointer hover:border-white overflow-hidden">
              <img draggable={false} className="w-max h-max object-contain" src={image} alt="" />
            </div>
          )
        })}

      </div>
    </div>
  );
}

const ImageSetPlaceholder = () => {
  return (
    <div className="my-8">
      <p className="text-gray-400 text-xl m-2">Loading...</p>
      <div className="grid xl:grid-cols-8 lg:grid-cols-6 sm:grid-cols-6 grid-cols-4 gap-4">
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
      </div>
    </div>
  )
}

const ImagePlaceholder = () => {
  return (
    <ContentLoader 
      speed={2}
      className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
      viewBox="0 0 100 100"
      backgroundColor="#312b2b"
      foregroundColor="#5c5757"
    >
      <rect x="0" y="0" rx="3" ry="3" width={100} height={100}/>
    </ContentLoader>
  )
}

export {ImageSet, ImageSetPlaceholder};