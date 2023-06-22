import { BiUpload } from "react-icons/bi";
import { AiTwotoneDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

const PhotoUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/api/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/api/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const deletePhoto = (filename) => {
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };
  const mainPhoto = (filename) => {
    const addedPhotosWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    onChange([filename, ...addedPhotosWithoutSelected]);
  };

  return (
    <>
      <div className="flex gap-4  ">
        <input
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          type="text"
          placeholder="Add using a link...."
        />
        <button
          onClick={addPhotoByLink}
          className="whitespace-nowrap px-4 rounded-md"
        >
          Add photo
        </button>
      </div>
      <div className=" mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4  ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover "
                src={`http://localhost:8080/uploads/${link}`}
                alt=""
              />
              <div
                onClick={() => deletePhoto(link)}
                className="absolute right-2 bottom-2 h-6 w-6 bg-white flex justify-center items-center rounded-full cursor-pointer"
              >
                <AiTwotoneDelete size={12} color="f53850" />
              </div>
              {link === addedPhotos[0] ? (
                <div className="absolute left-2 top-2 h-6 w-6 bg-white flex justify-center items-center rounded-full cursor-pointer">
                  <AiFillStar size={12} color="f53850" />
                </div>
              ) : (
                <div
                  onClick={() => mainPhoto(link)}
                  className="absolute left-2 top-2 h-6 w-6 bg-white opacity-80 flex justify-center items-center rounded-full cursor-pointer"
                >
                  <AiOutlineStar size={12} color="f53850" />
                </div>
              )}
            </div>
          ))}
        <label className="cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl flex text-gray-600 gap-2 items-center justify-center ">
          <input type="file" className="hidden" onChange={uploadPhoto} />
          <BiUpload size={20} /> <span className="text-sm">Upload</span>
        </label>
      </div>
    </>
  );
};
export default PhotoUploader;
