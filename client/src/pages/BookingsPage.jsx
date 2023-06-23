import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import format from "date-fns/format";
import { differenceInCalendarDays } from "date-fns";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get(`/api/bookings`).then(({ data }) => setBookings(data));
  }, []);
  return (
    <div className="mx-8">
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex bg-gray-100   gap-5 rounded-2xl"
            >
              <img
                className="w-48 object-cover rounded-l-xl"
                src={`http://localhost:8080/uploads/${booking.place.photos[0]}`}
                alt=""
              />
              <div className="py-4 grow flex flex-col justify-between">
                <h2 className="text-2xl  ">{booking.place.title}</h2>
                <div className="border-t py-2 flex items-center text-md gap-5">
                  <div>{format(new Date(booking.checkIn), "yyyy-MM-dd")}</div>
                  <AiOutlineArrowRight />
                  <div>{format(new Date(booking.checkout), "yyyy-MM-dd")}</div>
                </div>
                <div className="flex gap-2 text-lg ">
                  <div>
                    {differenceInCalendarDays(
                      new Date(booking.checkout),
                      new Date(booking.checkIn)
                    )}{" "}
                    nights
                  </div>{" "}
                  |
                  <div>
                    Total Price:
                    <span className="text-primary font-bold">
                      {" "}
                      ₹ {booking.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
