import { useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";
import PhotoGallery from "../components/PhotoGallery";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { differenceInCalendarDays, format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  console.log(booking);
  useEffect(() => {
    if (id) {
      axios.get("/api/bookings").then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="px-10">
      <AccountNav />
      <div>
        <h1 className="text-2xl">{booking.place.title}</h1>
        <a
          target="_blank"
          href={`https://maps.google.com/?q=${booking?.place?.address}`}
          className="underline font-semibold my-2 text-sm flex  items-center gap-1"
        >
          <MdLocationOn />
          {booking.place.address}
        </a>
        <div className="p-4 px-8 bg-gray-200 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl">Your booking information:</h2>
              <div className="flex items-center gap-5">
                <div>
                  {differenceInCalendarDays(
                    new Date(booking.checkout),
                    new Date(booking.checkIn)
                  )}{" "}
                  nights
                </div>{" "}
                |
                <div className="border-t py-2 flex items-center text-md gap-5">
                  <div>{format(new Date(booking.checkIn), "yyyy-MM-dd")}</div>
                  <AiOutlineArrowRight />
                  <div>{format(new Date(booking.checkout), "yyyy-MM-dd")}</div>
                </div>
              </div>
            </div>
            <div className="bg-primary p-4 rounded-2xl text-white">
              {" "}
              Total price <br />
              <span className="text-white font-bold  text-2xl">
                {" "}
                ₹ {booking.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <PhotoGallery place={booking.place} />
      </div>
    </div>
  );
};

export default BookingPage;
