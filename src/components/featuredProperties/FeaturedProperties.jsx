import React from "react";
import "./FeaturedProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, isLoading } = useFetch(
    "https://bookingappcyclicbackend.up.railway.app/api/v1/hotels?featured=true&limit=4"
  );
  console.log("data", data);

  return (
    <div className="fp">
      {isLoading ? (
        "loading "
      ) : (
        <>
          {data?.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
