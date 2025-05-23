import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full mt-10">
      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16 py-10 border-b border-white/30">

          {/* Logo and Description */}
          <div className="flex flex-col md:items-start items-center w-full">
            <img src={assets.logo_dark} alt="logo" className="w-32 md:w-40" />
            <p className="mt-6 text-center md:text-left text-sm text-white/80">
              Empowering learners worldwide with top-notch educational resources and tools to achieve their goals.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col md:items-start items-center w-full">
            <h2 className="font-medium text-white mb-5">Company</h2>
            <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="hidden md:flex flex-col items-start w-full">
            <h2 className="font-medium text-white mb-5">Subscribe to our newsletter</h2>
            <p className="text-sm text-white/80">
              Stay updated with the latest news, articles, and resources delivered to your inbox weekly.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <input
                className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-blue-600 w-24 h-9 text-white rounded hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        <p className="py-4 text-center text-xs md:text-sm text-white/60">
          Copyright 2025 © V-EDU All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
