import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = ({ jobsRef }) => {
  const location = useLocation();
  const isCoursesListPage = location.pathname.includes('/course-list');

  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator');
        return;
      }

      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(data.message);
        setIsEducator(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleScrollToJobs = () => {
    if (location.pathname === "/") {
      // Already on home, just scroll
      window.dispatchEvent(new CustomEvent('scrollToJobsSection'));
    } else {
      // Navigate to home, then scroll after navigation
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollToJobsSection'));
      }, 100); // Delay to ensure Home is mounted
    }
  };

  const handleCoursesClick = () => {
    navigate('/course-list');
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-3 bg-white`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-24 lg:w-28 cursor-pointer"
      />

      {/* Navigation Links in the Middle */}
      <div className="flex items-center gap-8 text-gray-700 font-serif text-lg">
        <button
          type="button"
          onClick={handleCoursesClick}
          className="hover:text-blue-600 transition"
        >
          Courses
        </button>
        <button
          type="button"
          onClick={handleScrollToJobs}
          className="hover:text-blue-600 transition"
        >
          Live Jobs
        </button>
        <Link to="/about" className="hover:text-blue-600 transition">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-blue-600 transition">
          Contact Page
        </Link>
      </div>

      {/* User Section */}
      <div className="md:flex hidden items-center gap-5 text-gray-700">
        <div className="flex items-center gap-5">
          {user && (
            <>
              {/* Contact Info Button */}
              <a
                href="tel:+18883444990"
                className="text-blue-900 font-semibold hover:underline flex items-center gap-1"
                style={{ whiteSpace: 'nowrap' }}
              >
                Got doubt? - +1 888-344-4990
              </a>
              {/* <button onClick={becomeEducator}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button> */}
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold"
          >
            Create Account
          </button>
        )}
      </div>

      {/* For Phone Screens */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-700">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          <button onClick={becomeEducator}>
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>
          | {user && <Link to="/my-enrollments">My Enrollments</Link>}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;