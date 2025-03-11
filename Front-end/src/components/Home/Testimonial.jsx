import React, { useState } from "react";
import { MDBCarouselItem } from "mdb-react-ui-kit";
import { assets } from "../../assets/assets";


const testimonials = [
  {
    name: "John Doe",
    text: "This is the best hotel I've ever stayed in. Amazing service and great atmosphere!.Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur",
    
    image: assets.cat, 
  },
  {
    name: "Jane Smith",
    text: "A truly relaxing experience. The spa and the view were absolutely breathtaking.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel ab illum sed quod perspiciatis sit suscipit, consequatur rem, obcaecati temporibus ",
    image: assets.man,
  },
  {
    name: "Panda PoPo",
    text: "I loved the food and the staff was super friendly. Definitely coming back!.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel ab illum sed quod perspiciatis sit suscipit, consequatur rem, obcaecati temporibus id",
    image: assets.panda,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-6 text-green-800">Our Customer Says</h2>
      
        {testimonials.map((testimonial, index) => (
          <MDBCarouselItem key={index} className={index === currentIndex ? "block" : "hidden"}>
            <div className=" p-6 rounded-lg shadow-md max-w-2xl text-center flex flex-col items-center">
                             
              <p className="text-lg text-gray-700 p-5">"{testimonial.text}"</p>
              <div className="testimonial-name flex flex-row items-center p-5">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h4 className="text-xl font-bold mt-3">{testimonial.name}</h4>
              </div>
            </div>
          </MDBCarouselItem>
        ))}
           
      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          className="px-4  bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4  bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
