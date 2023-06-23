import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  useEffect(() => {
    axios.get("/api/allplaces").then(({ data }) => {
      setAllPlaces(data);
    });
  }, []);
  return (
    <div className="mx-8 my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {allPlaces.map((place) => (
        <Link
          to={`/places/${place._id}`}
          key={place.title}
          className=" py-4 flex  flex-col gap-4 mx-3 cursor-pointer"
        >
          <div className="relative">
            {place.photos[0] && (
              <img
                src={`http://localhost:8080/uploads/${place.photos[0]}`}
                // className="rounded-lg"
                className="h-60 w-60 object-cover aspect-square rounded-lg"
                alt=""
              />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className=" truncate">{place.title}</h2>
            <h3 className="text-gray-400 text-sm text-md">{place.address}</h3>
            <h4 className="text-black text-md underline text-md">
              <span className="font-semibold mr-1">
                ₹{place.price.toLocaleString()}
              </span>
              total before taxes
            </h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default IndexPage;
