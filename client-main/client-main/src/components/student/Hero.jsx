import React from 'react';
import { assets } from '../../assets/assets';
import SearchBar from '../../components/student/SearchBar';

const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full md:pt-48 pt-32 px-7 md:px-0 space-y-10 text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${assets.backgroundImage})`, // Use the background image from assets
        minHeight: '110vh', // Increased height to ensure the image is fully visible
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <h1 className="md:text-6xl text-4xl relative font-bold text-white max-w-3xl mx-auto">
        Launch Your Tech Career with Confidence
        <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-0" />
      </h1>
      <p className="md:block hidden text-white max-w-2xl mx-auto font-bold md:text-xl">
        Master in-demand skills in Data Science, Machine Learning, React, and more — with real support from learning to landing the job.
      </p>
      <p className="md:hidden text-white max-w-sm mx-auto font-bold text-lg">
        Master in-demand skills in Data Science, Machine Learning, React, and more — with real support from learning to landing the job.
      </p>
      <div className="pb-16 relative z-20"> {/* Increased z-index for SearchBar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
