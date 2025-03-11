import React from "react";
import { rooms } from "../../assets/assets";

function Button() {
  return <button className="text-1xl  font-noto px-3">Explore Room →</button>;
}

function Category(props) {
  return <p className="text-4xl font-medium font-noto p-3">{props.text}</p>;
}

const RoomSuits = () => {
  return (
    <div className="room-suits flex flex-col items-center" id="room-suits">
      <p className="font-noto text-6xl font-medium text-green-800 p-10">
        Rooms & Suits
      </p>
      <div className="diyplay-room flex flex-col flex-wrap items-center m-5 mx-55 h-full ">
        <div className="group relative ">
          <img
            className="object-cover w-screen size-80 group-hover:blur-[3px] rounded-xl"
            src={rooms[0]}
          />
          <div className="absolute inset-0  rounded-xl flex flex-col items-start justify-end bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10">
            <Category text="Superior Garden View" />
            <Button />
          </div>
        </div>
        <div className="flex flex-row gap-4 pt-4">
          <div className="relative group w-3/5">
            <img
              className="w-full h-full object-cover hover:blur-[3px] rounded-xl"
              src={rooms[1]}
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end rounded-xl bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10">
              <Category text="Deluxe" />
              <Button />
            </div>
          </div>
          <div className="relative group w-2/5">
            <img
              className="w-full h-full object-cover hover:blur-[3px] rounded-xl"
              src={rooms[2]}
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end rounded-xl bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10">
              <Category text="Superior" />
              <Button />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 size-auto pt-4">
          <div className="relative w-1/2 group">
            <img
              className="w-full h-full hover:blur-sm rounded-xl"
              src={rooms[3]}
            />
            <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
              <Category text="Deluxe Room" />
              <Button />
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <div className="relative group">
              <img
                className="w-full hover:blur-[3px] rounded-xl"
                src={rooms[4]}
              />
              <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <Category text="Superior Room" />
                <Button />
              </div>
            </div>

            <div className="relative group">
              <img
                className="w-full hover:blur-[3px] rounded-xl"
                src={rooms[5]}
              />
              <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <Category text="Luxury Suite" />
                <Button />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSuits;
