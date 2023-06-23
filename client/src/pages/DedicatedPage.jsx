import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";
import BookingWidget from "../components/BookingWidget";
import { MdLocationOn } from "react-icons/md";

const DedicatedPage = () => {
  const [place, setPlace] = useState({});
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    if (!id) return;
    axios.get(`/api/places/${id}`).then(({ data }) => setPlace(data));
  }, [id]);
  // console.log(place);
  return (
    <>
      <div className="py-8 bg-gray-100 px-8 min-h-screen ">
        <h1 className="text-2xl">{place?.title}</h1>
        <a
          className=" underline font-semibold my-2 text-sm flex  items-center gap-1"
          target="_blank"
          href={`https://maps.google.com/?q=${place?.address}`}
        >
          <MdLocationOn />
          {place.address}
        </a>
        {place.photos && <PhotoGallery place={place} />}
        <div className="flex mt-3 gap-8">
          <div>
            <div>
              <div className="text-2xl font-semibold py-2">{place.title}</div>
              <div className="text-sm">{place.description}</div>
              <div className="border-b border-gray-300 py-3" />
              <div className="py-4">
                <h2 className="font-semibold text-xl">Description:</h2>
                {place.extraInfo}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <div>Check-in: {place.checkIn}</div>
                <div>Check-out: {place.checkout}</div>
                <div>Max number of guests: {place.maxGuests}</div>
              </div>
            </div>
            <div>{place.description}</div>
          </div>
          <div>{place && <BookingWidget place={place} />}</div>
        </div>
      </div>
      <div className="px-8 py-4">
        <h3 className="text-xl py-1 font-semibold">More Info</h3>
        <div className="text-sm">{place.extraInfo}</div>
      </div>
    </>
  );
};

export default DedicatedPage;
