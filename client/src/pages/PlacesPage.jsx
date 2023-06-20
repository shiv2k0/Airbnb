import { Link, useParams } from "react-router-dom";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(2);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/api/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const inputHeader = (header, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };
  return (
    <div>
      {action === "new" ? (
        <div>
          <form>
            {inputHeader(
              "Title",
              "title for your place. should be short and catchy as in advertisement"
            )}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title, for example: My lovely appartment"
            />
            {inputHeader("Address", "Address to this place")}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="address"
            />
            {inputHeader("Photos", "more = better")}
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
                  <div>
                    <img
                      className="rounded-2xl"
                      src={`http://localhost:8080/uploads/${link}`}
                      alt=""
                    />
                  </div>
                ))}
              <button className="border bg-transparent rounded-2xl p-8 text-2xl flex text-gray-600 gap-2 items-center justify-center ">
                <BiUpload size={20} /> <span className="text-sm">Upload</span>
              </button>
            </div>
            {inputHeader("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {inputHeader("Perks", "description of the place")}
            <Perks selected={perks} onChange={setPerks} />

            {inputHeader("Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {inputHeader(
              "Check in & out times , max guests",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -m-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -m-1">Check out time</h3>
                <input
                  type="text"
                  placeholder="11:00"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -m-1">Max number of guests</h3>
                <input
                  type="text"
                  placeholder="2"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <Link
            to="/account/places/new"
            className="bg-primary text-white  py-2 px-6 rounded-full "
          >
            <span className="text-xl mr-2">+</span>Add new place
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
