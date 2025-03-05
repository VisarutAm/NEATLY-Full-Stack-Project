import React from "react";
import Navbar from "../components/Navbar";
import AboutNeatly from "../components/Home/AboutNeatly";
import Service from "../components/Home/Service";
import RoomSuits from "../components/Home/RoomSuits";
import Testimonial from "../components/Home/Testimonial";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <AboutNeatly />
      <Service />
      <RoomSuits />
      <Testimonial/>
      <Footer/>
      
    </>
  );
};

export default Home;
