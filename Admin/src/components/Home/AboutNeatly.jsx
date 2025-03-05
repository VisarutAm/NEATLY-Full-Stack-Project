import React from "react";
import { rooms } from "../../assets/assets";
import Marquee from "react-fast-marquee";

const AboutNeatly = () => {
  return (
    <div className="about-neatly" id="about-neatly">
      <p className="topic text-6xl font-medium text-green-800 px-50 font-noto ">Neatly Hotel</p>
      <div className="description p-5 text-gray-700  font-inter flex justify-center">
        <span className="w-3xl  text-sm">
          Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
          with an outdoor pool, kids'club, sports facilities and a fitness
          centre. There is also a spa, an indoor pool and saunas.
           <br/><br/>
          All units at the hotel are equipped with a seating area, a flat-screen
          TV with satellite channels, a dining area and a private bathroom with
          free toiletries, a bathtub and a hairdryer. Every room in Neatly Hotel
          features a furnished balcony. Some rooms are equipped with a coffee
          machine.
          <br/><br/>
          Free WiFi and entertainment facilities are available at property and
          also rentals are provided to explore the area.
        </span>
      </div>
      
      <Marquee>
      <div className="marquee-room flex flex-row ">
        {rooms.map((room,index) => <img key={index} src={room} width={250} style={{ margin: "2rem 0.5rem", borderRadius: "0.5rem" }}/>)}
      </div>
</Marquee>
    </div>
  );
};

export default AboutNeatly;
