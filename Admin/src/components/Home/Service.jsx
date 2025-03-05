import React from "react";
import { assets } from "../../assets/assets";

const Service = () => {
  return (
    <div
      className="service bg-green-700 w-full h-full flex flex-col items-center "
      id="service"
    >
      <p className="font-noto font-medium text-5xl text-white p-15">
        Service & Facilities
      </p>
      <div className="image-service flex flex-wrap gap-15 pb-20 mx-15">
        <div className="spa  flex flex-col  items-center w-20">
          <img width={35} src={assets.spa} />
          <p className="text-white font-noto font-extralight pt-3 ">Spa</p>
        </div>
        <div className="water  flex flex-col items-center w-20">
          <img width={40} src={assets.water} />
          <p className="text-white font-noto font-extralight pt-1 ">Sauna</p>
        </div>
        <div className="exercise  flex flex-col items-center w-20">
          <img width={40} src={assets.exercise} />
          <p className="text-white font-noto font-extralight pt-1 ">Fitness</p>
        </div>
        <div className="group  flex flex-col items-center max-se:w-20">
          <img width={40} src={assets.group} />
          <p className="text-white font-noto font-extralight pt-4 ">Arrival Lounge</p>
        </div>
        <div className="wifi  flex flex-col items-center w-20">
          <img width={40} src={assets.wifi} />
          <p className="text-white font-noto font-extralight pt-4 ">Free Wifi</p>
        </div>
        <div className="carbon_car  flex flex-col items-center w-20">
          <img width={45} src={assets.carbon_car} />
          <p className="text-white font-noto font-extralight ">Parking</p>
        </div>
        <div className="phone  flex flex-col items-center max-se:w-20">
          <img width={40} src={assets.phone} />
          <p className="text-white font-noto font-extralight pt-1 ">24 hours operation</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
