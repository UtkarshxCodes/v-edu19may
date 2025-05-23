import React from 'react';
import { assets } from '../../assets/assets';

const CallToAction = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-10 pb-24 px-8 md:px-0 bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      {/* Main Heading */}
      <h1 className="md:text-5xl text-2xl text-blue-800 font-extrabold">
        Learning has never been so easy before
      </h1>

      {/* Subheading */}
      <h2 className="md:text-4xl text-xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h2>

      {/* Description */}
      <p className="text-gray-500 sm:text-sm text-center max-w-2xl">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
      </p>

      {/* Buttons */}
      <div className="flex items-center font-medium gap-6 mt-4">
        <button
          className="px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          onClick={scrollToTop} // Redirect to the top of the page
        >
          Get started
        </button>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
          Learn more
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;