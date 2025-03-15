import React from "react";
import Navbar from "../components/Navbar";
import AboutNeatly from "../components/Home/AboutNeatly";
import Service from "../components/Home/Service";
import RoomSuits from "../components/Home/RoomSuits";
import Testimonial from "../components/Home/Testimonial";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <>
    <ToastContainer/>
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
