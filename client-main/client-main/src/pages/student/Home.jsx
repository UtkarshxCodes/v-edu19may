import React, { useRef, useEffect, useState } from 'react';
import Footer from '../../components/student/Footer';
import Hero from '../../components/student/Hero';
import Companies from '../../components/student/Companies';
import JobPostingSection from '../../components/student/JobPostingSection';
import CoursesSection from '../../components/student/CoursesSection';
import TestimonialsSection from '../../components/student/TestimonialsSection';
import CallToAction from '../../components/student/CallToAction';
import StepsSection from '../../components/student/StepsSection';
import ErrorBoundary from "../../components/student/ErrorBoundary";
import Navbar from '../../components/student/Navbar';
import { assets } from '../../assets/assets';
import CourseRegistration from '../../components/student/CourseRegistration';
import PaymentModal from '../../components/student/Paymentmodel';
import './JobsList.css';

const jobData = [ /* ...your jobs... */ ];

const JobsList = ({ setShowRegistration }) => (
  <section className="jobs-list-section">
    <div className="jobs-list-container">
      <h2 className="jobs-list-title">All Job Openings</h2>
      <div className="jobs-list-horizontal">
        {jobData.map((job, index) => (
          <div key={index} className="jobs-list-card">
            <div className="jobs-list-card-main">
              <h3>{job.role} <span className="company">@ {job.company}</span></h3>
              <p className="location">{job.location} — {job.type}</p>
              <p className="desc">{job.description}</p>
              <div className="jobs-list-meta">
                <span>{job.positions}</span>
                <span className="salary">{job.salary}</span>
                <span className="hourly">{job.hourly}</span>
              </div>
            </div>
            <button
              className="apply-btn"
              onClick={() => setShowRegistration(true)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  const jobsRef = useRef(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });
  const [courseData, setCourseData] = useState({}); // <-- new state for course data
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    const scrollHandler = () => {
      if (jobsRef.current) {
        jobsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('scrollToJobsSection', scrollHandler);
    return () => window.removeEventListener('scrollToJobsSection', scrollHandler);
  }, []);

  useEffect(() => {
    const trigger = document.querySelector("menu > .trigger");
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.currentTarget.parentElement.classList.toggle("open");
      });
    }
    return () => {
      if (trigger) {
        trigger.removeEventListener('click', () => {});
      }
    };
  }, []);

  const handleStripePay = async (amount) => {
    console.log("Selected Course for Stripe:", selectedCourse); // Debugging log
    if (!selectedCourse?._id || !amount) {
      alert("No course selected or invalid amount.");
      return;
    }

    try {
      const res = await fetch("/api/user/purchase-stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: selectedCourse._id,
          amount,
        }),
      });

      const data = await res.json();
      if (data.success && data.session_url) {
        window.location.href = data.session_url; // Redirect to Stripe Checkout
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (error) {
      console.error("Stripe Payment Error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  const handlePaypalPay = async (amount) => {
    console.log("Selected Course for PayPal:", selectedCourse); // Debugging log
    if (!selectedCourse?._id || !amount) {
      alert("No course selected or invalid amount.");
      return;
    }

    try {
      const res = await fetch('/api/user/paypal-create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          description: `Payment for course: ${selectedCourse.courseTitle}`,
        }),
      });

      const data = await res.json();
      if (data.success && data.approvalUrl) {
        window.location.href = data.approvalUrl; // Redirect to PayPal approval page
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (error) {
      console.error("PayPal Payment Error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  const handleApplyCoupon = async (coupon) => {
    console.log("Selected Course:", selectedCourse); // Debugging log
    const res = await fetch('/api/user/apply-coupon', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      body: JSON.stringify({ couponCode: coupon, courseId: selectedCourse?._id }) // Send plain data
    });
    const data = await res.json();
    if (data.success) {
      setDiscountAmount(data.discountAmount);
      setCouponError("");
    } else {
      setCouponError(data.message);
    }
  };

  console.log("selectedCourse:", selectedCourse);
  console.log("Sending to backend:", { courseId: selectedCourse?._id });

  return (
    <>
      <div className="flex flex-col items-center space-y-7 text-center px-4 md:px-8 lg:px-16">
        <Hero />
        <ErrorBoundary>
          <Companies />
        </ErrorBoundary>
        <div ref={jobsRef}>
          <JobPostingSection />
        </div>
        <CoursesSection
          onEnroll={(course) => {
            setSelectedCourse(course); // Ensure this sets the correct course object
            setShowPaymentModal(true);
          }}
        />
      </div>
      {/* New Video Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-black">
        <video
          className="w-auto h-full max-w-full object-contain"
          src={assets.videolms}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>
      {/* Other sections below the video */}
      <StepsSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />

      {/* Floating Action Button Menu */}
      <menu id="fab-menu">
        <a href="#" className="action">
          <i className="fab fa-dribbble"></i> {/* Font Awesome Brand Icon */}
        </a>
        <a href="mailto:support@example.com" className="action">
          <i className="fas fa-envelope"></i> {/* Font Awesome Solid Icon */}
        </a>
        <button
          type="button"
          className="action"
          style={{
            background: "var(--bg-color)",
            color: "var(--fg-color)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowRegistration(true)}
          aria-label="Register"
        >
          <i className="fas fa-clipboard-list"></i> {/* Font Awesome Solid Icon */}
        </button>
        <a href="/contact" className="action">
          <i className="fas fa-address-card"></i> {/* Font Awesome Solid Icon */}
        </a>
        <a href="#" className="trigger">
          <i className="fas fa-plus"></i> {/* Font Awesome Solid Icon */}
        </a>
      </menu>
      <CourseRegistration
        isOpen={showRegistration}
        setIsOpen={setShowRegistration}
        onRegistered={() => setShowPaymentModal(true)}
        formData={formData}
        setFormData={setFormData}
      />
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        courseId={selectedCourse?._id}
        coursePrice={selectedCourse?.coursePrice}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        couponError={couponError}
        onStripePay={handleStripePay}
        onPaypalPay={handlePaypalPay}
      />
 
    
    </>
  );
};

export default Home;
