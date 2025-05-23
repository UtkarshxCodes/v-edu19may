import React from 'react';
import './Companies.css'; // Import the CSS file

const Companies = () => {
  return (
    <div className="pt-12"> {/* Reduced padding from top */}
      <p className="text-4xl font-bold text-gray-800 text-center">
        Trusted by learners from
      </p>
      <div
        className="slider mt-8"
        style={{
          "--width": "120px", // Adjust the width of each image
          "--height": "120px", // Increase the height to fit the logos
          "--quantity": "10", // Number of images
          "--spacing": "35px", // Add spacing between images
        }}
      >
        <div className="list">
          <div
            className="item"
            style={{
              "--position": 1,
            }}
          >
            <img src="/microsoft.png" alt="Microsoft" />
          </div>
          <div
            className="item"
            style={{
              "--position": 2,
            }}
          >
            <img src="/walmart.png" alt="Walmart" />
          </div>
          <div
            className="item"
            style={{
              "--position": 3,
            }}
          >
            <img src="/Accenture.png" alt="Accenture" />
          </div>
          <div
            className="item"
            style={{
              "--position": 4,
            }}
          >
            <img src="/Adobe.png" alt="Adobe" />
          </div>
          <div
            className="item"
            style={{
              "--position": 5,
            }}
          >
            <img src="/PayPal.png" alt="Paypal" />
          </div>
          <div
            className="item"
            style={{
              "--position": 6,
            }}
          >
            <img src="/amazon.png" alt="Amazon" />
          </div>
          <div
            className="item"
            style={{
              "--position": 7,
            }}
          >
            <img src="/google.png" alt="Google" />
          </div>
          <div
            className="item"
            style={{
              "--position": 8,
            }}
          >
            <img src="/linkedin.png" alt="LinkedIn" />
          </div>
          <div
            className="item"
            style={{
              "--position": 9,
            }}
          >
            <img src="/twitter.png" alt="Twitter" />
          </div>
          <div
            className="item"
            style={{
              "--position": 10,
            }}
          >
            <img src="/figma.png" alt="Figma" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
