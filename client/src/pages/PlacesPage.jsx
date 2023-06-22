import { Link, useParams } from "react-router-dom";
import PlacesForm from "../components/PlacesFormPage";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/api/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      {action === "new" ? (
        <PlacesForm />
      ) : (
        <div className="text-center">
          <Link
            to="/account/places/new"
            className="bg-primary text-white  py-2 px-6 rounded-full "
          >
            <span className="text-xl mr-2">+</span>Add new place
          </Link>
          <br />
          <div className="mt-3 text-2xl underline">
            Lists of all added places
          </div>
          {places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className="bg-gray-100 gap-4 p-4 mx-4 max-w-6xl xl:mx-auto rounded-2xl flex cursor-pointer my-4"
            >
              <div className="h-32 w-32  bg-gray-200 shrink-0">
                <img
                  src={`http://localhost:8080/uploads/${place.photos[0]}`}
                  className="object-cover rounded-md h-full "
                  alt=""
                />
              </div>
              <div className="flex flex-col  items-start">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 text-start">{place.extraInfo}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
