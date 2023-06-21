import { BiUpload } from "react-icons/bi";
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
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover "
                src={`http://localhost:8080/uploads/${link}`}
                alt=""
              />
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
