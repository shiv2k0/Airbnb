import { useState } from "react";
import { TbGridDots } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

const PhotoGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  //   console.log(photos);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed  right-12 top-8 flex items-center gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <RxCross2 />
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, key) => (
              <div key={key} className="mx-auto">
                <img
                  className="max-w-[45rem] sm:w-full w-full"
                  src={photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="relative my-6">
        <div className="flex gap-2 ">
          <div className="flex-1">
            <img
              onClick={() => setShowAllPhotos(true)}
              className=" rounded-l-xl h-full cursor-pointer hover:opacity-90 object-cover"
              src={place.photos[0]}
              alt=""
            />
          </div>
          <div className="flex-1 w-full flex gap-2">
            <div className="flex flex-col gap-2">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="flex-1 hover:opacity-90 cursor-pointer object-cover"
                src={place.photos[1]}
                alt=""
              />
              <img
                onClick={() => setShowAllPhotos(true)}
                className="flex-1 hover:opacity-90 cursor-pointer object-cover"
                src={place.photos[2]}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="flex-1 hover:opacity-90 rounded-tr-xl cursor-pointer object-cover"
                src={place.photos[3]}
                alt=""
              />
              <img
                onClick={() => setShowAllPhotos(true)}
                className="flex-1 hover:opacity-90 rounded-br-xl  cursor-pointer object-cover"
                src={place.photos[4]}
                alt=""
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex items-center gap-1 px-3 py-1 rounded-lg border border-black bg-white text-sm absolute right-2 bottom-3"
        >
          <TbGridDots />
          Show all photos
        </button>
      </div>
    </>
  );
};

export default PhotoGallery;
