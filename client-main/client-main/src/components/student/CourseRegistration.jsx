import React, { useState } from "react";

const CourseRegistration = ({ isOpen, setIsOpen, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Only send registration data, no payment
    await fetch('/api/send-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    setIsOpen(false);
    alert("Registration submitted!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-[9999]">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
        {/* Banner */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl py-5 mb-6 flex flex-col items-center shadow-lg">
          <span className="text-3xl font-extrabold text-white tracking-wide mb-2">Register Now</span>
          <span className="text-lg text-white font-semibold">for any course</span>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Course Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border-2 border-blue-200 rounded p-3 focus:border-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 border-blue-200 rounded p-3 focus:border-blue-400 outline-none"
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Your Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full border-2 border-blue-200 rounded p-3 focus:border-blue-400 outline-none"
          />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="w-full border-2 border-blue-200 rounded p-3 focus:border-blue-400 outline-none bg-white"
          >
            <option value="">Select the course you want to register for</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Data Science">Data Science & AI</option>
            <option value="DevOps">DevOps & Cloud</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-cyan-500 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500 text-xs">
          After registration, you’ll be contacted by our team.
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;