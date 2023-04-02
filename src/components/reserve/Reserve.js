import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useSearchContext } from "../../context/SearchContext.js";
import useFetch from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const { seletedRooms, setSelectedRooms } = useState([]);
  const { data } = useFetch(
    `https://bookingappcyclicbackend.up.railway.app/api/v1/hotels/room/${hotelId}`
  );
  const { dates } = useSearchContext();
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...seletedRooms, value]
        : seletedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        seletedRooms.map((roomId) => {
          const { data } = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          console.log("data", data);
          return data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your Rooms:</span>
        {data?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <span>{item.maxPeople}</span>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSeletedRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    disabled={!isAvailable(roomNumber)}
                    onChange={handleSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
