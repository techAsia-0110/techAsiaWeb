import React from 'react';
import heroBgImage from '../../assets/landingPage/hero.png';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat h-[33rem] md:h-[42rem] clip-ellipse-md lg:clip-ellipse-lg"
      style={{
        backgroundImage: `url(${heroBgImage})`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 clip-ellipse-md lg:clip-ellipse-lg"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col items-center text-center py-28 md:py-0 md:justify-center">
        
        {/* Established Badge */}
        <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400 mb-4 md:mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-yellow-400 text-[0.7rem] lg:text-sm font-medium">Established 2016</span>
        </div>

        <h1 className="mt-4 text-[1.6rem] md:text-[3.5rem] font-extrabold text-white leading-tight">
          Empowering Innovation
          <br />
          <span className="text-yellow-400 inline-block mt-2 md:mt-4">
            in Electronics & Automation
          </span>
        </h1>

        <p className="mt-4 md:mt-6 max-w-3xl text-[1rem] md:text-lg text-gray-300">
          Cutting-edge solutions for manufacturing, process control, and industrial automation that help businesses increase productivity and reduce operational costs.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* The "Explore" button now links to the /products page */}
          <Link 
            to="/products"
            className="bg-black bg-opacity-50 backdrop-blur-md text-white font-bold py-3 px-8 rounded-full border-2 border-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore
          </Link>
          
          {/* The "Contact" button  links to  /vCard page */}
          <Link 
            to="/vCard"
            className="bg-transparent border-2 border-gray-400 text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Our Card
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
