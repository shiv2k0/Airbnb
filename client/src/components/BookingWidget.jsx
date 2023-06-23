import { useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
const BookingWidget = ({ place }) => {
  const user = useSelector(selectUser);
  //   console.log(place);
  const [checkIn, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  let numberOfNights = 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (checkIn && checkout) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkout),
      new Date(checkIn)
    );
  }
  const price = numberOfNights * place.price;

  const onBooking = async () => {
    const { data } = await axios.post("/api/booking", {
      name,
      phone,
      place: place._id,
      checkIn,
      checkout,
      guests,
      price,
    });
    const bookingId = await data._id;
    navigate(`/account/bookings/${bookingId}`);
  };
  return (
    <div className="bg-white px-6 py-3 rounded-2xl shadow-lg">
      <div className="py-3">
        <h2 className="text-2xl py-1 ">
          ₹ {place.price?.toLocaleString()} per night
        </h2>
        <div className="font-light text-sm ">Total before taxes</div>
      </div>
      <div className="flex flex-col border rounded-2xl p-0">
        <div className="flex justify-around p-5 gap-8">
          <div className="flex flex-col  ">
            <label className="uppercase font-bold text-xs">Check in:</label>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex flex-col ">
            <label className="uppercase font-bold text-xs">Check out:</label>
            <input
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              type="date"
            />
          </div>
        </div>
        <hr />
        <div className="p-6  flex flex-col gap-1 ">
          <label className="uppercase font-bold  text-xs">
            number of Guests
          </label>
          <input
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="p-2 "
          />
        </div>
        {numberOfNights > 0 && (
          <div>
            <hr />
            <div className="p-4  flex flex-col gap-1 ">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border-none"
                type="text"
                placeholder="Your Full Name"
              />
            </div>
            <hr />
            <div className="p-4  flex flex-col gap-1 ">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 border-none"
                type="number"
                placeholder="Phone Number"
              />
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onBooking}
        className="primary my-4 flex justify-center gap-4"
      >
        Book Now
        {numberOfNights > 0 && (
          <span className="font-bold">₹ {price.toLocaleString()}</span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
