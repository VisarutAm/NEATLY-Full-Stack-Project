import React, { useState } from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-green-800 ">       
        <div className="px-28 mt-4 pb-4 pt-4 flex-col md:flex-row items-center justify-between hidden sm:block">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex  mb-8 flex-col">
              <a href="/" className="flex items-center">
                <img
                  src={assets.logo_2}
                  alt="HomeServices Logo"
                  className="h-8 sm:h-10 mr-2"
                />                
              </a>
              <div className="p-6 text-white font-bold">Neatly Hotel<h6 className="text-xs font-extralight">The best hotel for rising your experience</h6></div>
            </div>
           
            <div className=" text-base text-left mt-4 md:mt-0">
                <p className="text-white font-noto text-2xl p-5">Contact</p>
              <div className="flex items-center">
                <img
                  src={assets.tel_icon}
                  alt="Tel_icon"
                  className="mr-2 h-4 w-4"
                />
                <p className="text-white text-xs font-extralight">080-540-XXXX</p>
              </div>
              <div className="flex items-center mt-2">
                <img
                  src={assets.mail_icon}
                  alt="Mail_icon"
                  className="mr-2 h-4 w-4"
                />
                <p className="text-white text-xs font-extralight">
                  contact@homeservices.co
                </p>
              </div>
              <div className="flex items-center pt-2">
                <img
                  src={assets.placeholder}
                  alt="Tel_icon"
                  className="mr-2 h-4 w-4 text-white"
                />
                <div className="text-white text-xs font-extralight">188 phaya Thai Rd, Thung Phaya Thai,<p>Ratchathewi, Bangkok 10400</p></div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 mt-4 pb-4 pt-4 flex-col md:flex-row items-center justify-between bg-green-800 hidden sm:block">
          <hr className="pt-5 text-white"></hr>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
            <p className="font-prompt text-xs font-normal leading-6 text-left text-white">
              copyright © 2021 HomeServices.com All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
