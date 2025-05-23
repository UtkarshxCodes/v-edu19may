import React from "react";

const ContactUs = () => (
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
        max-width: 520px;
        margin: 56px auto 0 auto;
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.09);
        padding: 40px 32px 32px 32px;
        display: flex;
        flex-direction: column;
        gap: 2.2em;
      }
      .first-class h1 {
        color: #2563eb;
        font-size: 2.3rem;
        margin-bottom: 0.2em;
        text-align: center;
        font-weight: 800;
        letter-spacing: -1px;
      }
      .first-class form {
        display: flex;
        flex-direction: column;
        gap: 1.5em;
      }
      .first-class label {
        font-weight: 600;
        margin-bottom: 0.4em;
        display: block;
        color: #1a202c;
      }
      .first-class input, .first-class textarea {
        padding: 0.85em 1em;
        border: 1.5px solid #cbd5e1;
        border-radius: 7px;
        font-size: 1.07rem;
        background: #f1f5f9;
        margin-top: 0.1em;
        width: 100%;
        box-sizing: border-box;
        transition: border 0.2s;
      }
      .first-class input:focus, .first-class textarea:focus {
        border-color: #2563eb;
        outline: none;
        background: #e0e7ef;
      }
      .first-class textarea { min-height: 110px; }
      .first-class button {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 7px;
        padding: 1em 0;
        font-size: 1.13rem;
        font-weight: 700;
        cursor: pointer;
        margin-top: 0.5em;
        transition: background 0.2s;
        box-shadow: 0 2px 8px rgba(37,99,235,0.07);
      }
      .first-class button:hover {
        background: #1d4ed8;
      }
      .first-class .address, .first-class .contact-info {
        background: #e0e7ef;
        padding: 1.1em 1em;
        border-radius: 8px;
        font-size: 1.07rem;
        margin-bottom: 0.7em;
        text-align: left;
        line-height: 1.6;
      }
      .first-class .contact-info {
        background: #f1f5f9;
        margin-bottom: 0;
      }
      .first-class .contact-info a {
        color: #2563eb;
        text-decoration: underline;
        word-break: break-all;
      }
      @media (max-width: 600px) {
        .first-class .container { padding: 18px 6px; }
        .first-class h1 { font-size: 1.5rem; }
      }
    `}</style>
    <div className="container">
      <h1>Contact Us</h1>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required placeholder="How can we help you?"></textarea>
        </div>
        <a
          href="mailto:Support@v-edu.us"
          className="first-class-send-btn"
          style={{
            display: 'block',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '7px',
            padding: '1em 0',
            fontSize: '1.13rem',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '0.5em',
            textAlign: 'center',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(37,99,235,0.07)'
          }}
        >
          Send Message
        </a>
      </form>
      <div className="address">
        <strong>Address:</strong><br />
        1908 Thomes Ave STE 12363,<br />
        Cheyenne, WY 82001
      </div>
      <div className="contact-info">
        <strong>Phone:</strong> +1 888-344-4990<br />
        <strong>Email:</strong> <a href="mailto:support@v-edu.us">support@v-edu.us</a>
      </div>
    </div>
  </div>
);

export default ContactUs;