import { useEffect, useState } from "react";
import PhotoUploader from "./PhotoUploader";
import Perks from "./Perks";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(2);
  const [price, setPrice] = useState(50000);

  const inputHeader = (header, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  const placeData = {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkout,
    maxGuests,
    price,
  };

  const savePlave = async (ev) => {
    ev.preventDefault();
    if (id) {
      await axios.put("/api/places", {
        id,
        ...placeData,
      });
      navigate("/account/places");
    } else {
      await axios.post("/api/places", {
        ...placeData,
      });
      navigate("/account/places");
    }
  };
  useEffect(() => {
    if (!id) return;
    axios.get(`/api/places/${id}`).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckout(data.checkout);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  return (
    <>
      <AccountNav />
      <form onSubmit={savePlave} className=" max-w-5xl mx-auto">
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
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-2">
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
          <div>
            <h3 className="mt-2 -m-1">Price per night ₹</h3>
            <input
              type="text"
              placeholder="2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="primary my-4">
          Save
        </button>
      </form>
    </>
  );
};

export default PlacesFormPage;
