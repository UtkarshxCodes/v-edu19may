import React from "react";
import { assets } from "../../assets/assets";

const AboutUs = () => (
  <div className="first-class">
    <style>{`
      .first-class {
        font-family: 'Outfit', Arial, sans-serif;
        background: #f7fafc;
        color: #1a202c;
        min-height: 100vh;
        padding: 0;
        margin: 0;
      }
      .first-class .container {
        max-width: 900px;
        margin: 40px auto;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.09);
        padding: 40px 32px 32px 32px;
        display: flex;
        flex-direction: column;
        gap: 2.5em;
      }
      .first-class h1 {
        color: #2563eb;
        font-size: 2.5rem;
        margin-bottom: 0.5em;
        text-align: center;
        font-weight: 800;
      }
      .first-class .map-section {
        margin: 1.5em 0 2em 0;
        text-align: center;
      }
      .first-class .map-section h3 {
        font-size: 1.18rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 1em;
      }
      .first-class .map-section img {
        width: 100%;
        max-width: 1000px;
        min-height: 320px;
        min-width: 350px;
        height: 50vh;
        object-fit: cover;
        border-radius: 18px;
        box-shadow: 0 2px 24px rgba(37,99,235,0.13);
        margin: 0 auto 1.5em auto;
        display: block;
      }
      .first-class h2 {
        color: #1a202c;
        font-size: 1.5rem;
        margin-top: 2em;
        margin-bottom: 0.5em;
        font-weight: 700;
      }
      .first-class p {
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 1.2em;
      }
      .first-class ul {
        margin: 1em 0 1em 1.5em;
        padding: 0;
      }
      .first-class li {
        margin-bottom: 0.5em;
        font-size: 1.1rem;
      }
      .first-class .contact-row {
        display: flex;
        align-items: center;
        gap: 2.5em;
        background: #f1f5f9;
        border-radius: 10px;
        padding: 1.1em 1.5em;
        margin-top: 2em;
        margin-bottom: 1.5em;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      .first-class .contact-row span {
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-size: 1.08rem;
        font-weight: 600;
        color: #2563eb;
      }
      .first-class .contact-row a {
        color: #2563eb;
        text-decoration: underline;
        font-weight: 600;
        word-break: break-all;
      }
      .first-class .address {
        background: #e0e7ef;
        padding: 1em;
        border-radius: 8px;
        margin-top: 2em;
        font-size: 1rem;
      }
      @media (max-width: 900px) {
        .first-class .container { padding: 18px 6px; }
        .first-class .map-section img { min-height: 180px; height: 30vh; }
      }
      @media (max-width: 600px) {
        .first-class h1 { font-size: 2rem; }
        .first-class .contact-row { flex-direction: column; gap: 1em; padding: 1em; }
        .first-class .map-section img { min-width: 0; }
      }
    `}</style>
    <div className="container">
      <h1>About V-edu.us</h1>
      <div className="map-section">
        <h3>Discover Our Location & National Presence</h3>
        <img src={assets.map} alt="V-edu.us Map View" />
        <p style={{fontSize: "1.13rem", color: "#374151", marginTop: "1em", marginBottom: 0}}>
          Our headquarters is strategically located in Cheyenne, Wyoming, enabling us to serve learners and professionals across the United States. The map below highlights our main office and our commitment to nationwide reach and support.
        </p>
      </div>
      <h2>Our Mission</h2>
      <p>
        We believe in transforming lives through learning and opportunity. Our mission is to provide a seamless, supportive, and innovative environment for upskilling, job placement, and lifelong growth.
      </p>
      <h2>What We Offer</h2>
      <ul>
        <li><strong>Expert-Led Courses:</strong> Learn from industry leaders across tech, business, and more.</li>
        <li><strong>Career Guidance:</strong> Personalized job placement and resume-building support.</li>
        <li><strong>Upskilling:</strong> Stay ahead with the latest skills and certifications.</li>
        <li><strong>Community:</strong> Join a network of learners and mentors across the U.S.</li>
      </ul>
      <div className="contact-row">
        <span>
          <i className="ri-phone-fill" style={{fontSize: "1.2em"}}></i>
          <a href="tel:+18883444990">+1 888-344-4990</a>
        </span>
        <span>
          <i className="ri-mail-fill" style={{fontSize: "1.2em"}}></i>
          <a href="mailto:support@v-edu.us">support@v-edu.us</a>
        </span>
      </div>
      <div className="address">
        <strong>Our Address:</strong><br />
        1908 Thomes Ave STE 12363,<br />
        Cheyenne, WY 82001
      </div>
    </div>
  </div>
);

export default AboutUs;