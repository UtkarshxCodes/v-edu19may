import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/student/Footer';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube';
import { useAuth } from '@clerk/clerk-react';
import Loading from '../../components/student/Loading';
import certificate1 from '../../assets/certificate1.png';
import certificate2 from '../../assets/certificate2.png';
import certificate3 from '../../assets/certificate3.png';
import PaymentModal from '../../components/student/Paymentmodel';

const CourseDetails = () => {

  const { id } = useParams();
  const { backendUrl } = useContext(AppContext)

  const [courseData, setCourseData] = useState(null)
  const [playerData, setPlayerData] = useState(null)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const { currency, userData, calculateChapterTime, calculateCourseDuration, calculateRating, calculateNoOfLectures } = useContext(AppContext)
  const { getToken } = useAuth()


  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/' + id)
      if (data.success) {
        setCourseData(data.courseData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const enrollCourse = async () => {
    console.log('userData:', userData); // Add this line

    try {

      if (!userData) {
        return toast.warn('Login to Enroll')
      }

      if (isAlreadyEnrolled) {
        return toast.warn('Already Enrolled')
      }

      const token = await getToken();

      const { data } = await axios.post(backendUrl + '/api/user/purchase',
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url) // Redirects to Stripe Checkout
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    console.log('courseData:', courseData);
  }, [courseData]);

  useEffect(() => {

    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }

  }, [userData, courseData])

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set countdown to 4 days from first render
    const endTime = Date.now() + 4 * 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = endTime - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStripePayment = async () => {
    setShowPaymentModal(false);
    // ...your Stripe payment code...
  };

  // PayPal payment logic
  const handlePaypalPayment = async () => {
    setShowPaymentModal(false);
    try {
      if (!userData) return toast.warn('Login to Enroll');
      if (isAlreadyEnrolled) return toast.warn('Already Enrolled');
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/user/paypal-create-order',
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        window.location.replace(data.approvalUrl); // Redirect to PayPal approval page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleApplyCoupon = (code) => {
    switch (code) {
      case "vedu100":
        setDiscountAmount(100);
        setCouponError("");
        break;
      case "v-edu20":
        setDiscountAmount(199);
        setCouponError("");
        break;
      case "v-edu3":
        setDiscountAmount(299);
        setCouponError("");
        break;
      case "V-Edu50":
        setDiscountAmount(500);
        setCouponError("");
        break;
      case "V-EDU7":
        setDiscountAmount(699);
        setCouponError("");
        break;
      default:
        setDiscountAmount(0);
        setCouponError("Invalid coupon code");
    }
  };

  const handleStripePay = async (amount, coupon) => {
    setShowPaymentModal(false);
    try {
      if (!userData) return toast.warn('Login to Enroll');
      if (isAlreadyEnrolled) return toast.warn('Already Enrolled');
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/user/purchase',
        { courseId: courseData._id, amount, coupon },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePaypalPay = async (amount, coupon) => {
    setShowPaymentModal(false);
    try {
      if (!userData) return toast.warn('Login to Enroll');
      if (isAlreadyEnrolled) return toast.warn('Already Enrolled');
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/user/paypal-create-order',
        { courseId: courseData._id, amount, coupon },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        window.location.replace(data.approvalUrl);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p className="pt-4 md:text-base text-sm" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}>
          </p>

          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>4.5</p>
            <div className='flex'>
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star} alt='' className='w-3.5 h-3.5' />
              ))}
              <img src={assets.star_half || assets.star} alt='' className='w-3.5 h-3.5' />
            </div>
            <p className='text-blue-600'>(71 ratings)</p>
            <p>62 students</p>
          </div>

          <p className='text-sm'>
            Course by <span className='text-blue-600 underline'>David Watts</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            {/* Universal IT Course Roadmap */}
            <div className="w-full flex flex-col items-center mb-4 mt-4">
              <div className="flex flex-row items-center justify-center gap-0 md:gap-4 w-full overflow-x-auto">
                {/* Step 1 */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">1</div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-blue-700">Intro</span>
                </div>
                <div className="w-8 h-1 bg-blue-300 rounded-full mx-1 md:mx-2"></div>
                {/* Step 2 */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">2</div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-blue-700">Fundamentals</span>
                </div>
                <div className="w-8 h-1 bg-blue-300 rounded-full mx-1 md:mx-2"></div>
                {/* Step 3 */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">3</div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-blue-700">Core Modules</span>
                </div>
                <div className="w-8 h-1 bg-blue-300 rounded-full mx-1 md:mx-2"></div>
                {/* Step 4 */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="bg-blue-300 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">4</div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-blue-700">Project/Capstone</span>
                </div>
                <div className="w-8 h-1 bg-blue-300 rounded-full mx-1 md:mx-2"></div>
                {/* Step 5 */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="bg-blue-200 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md border border-blue-400">5</div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-blue-700">Assessments</span>
                </div>
                <div className="w-8 h-1 bg-blue-300 rounded-full mx-1 md:mx-2"></div>
                {/* Step 6 */}
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="bg-green-400 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-md">6</div>
                  <span className="mt-2 text-xs md:text-sm font-semibold text-green-700">Certifications</span>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="pt-2">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img src={assets.down_arrow_icon} alt="arrow icon" className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`} />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default">{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"}`} >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="bullet icon" className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                                videoId: lecture.lectureUrl.split('/').pop()
                              })} className='text-blue-500 cursor-pointer'>Preview</p>}
                              <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-10 text-base md:text-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Course Description</h3>
            <div
              className="rich-text pt-3"
              style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
                  .replace(/<ol/gi, '<ul')
                  .replace(/<\/ol>/gi, '</ul>')
                  .replace(/<li/gi, '<li style="list-style-type: disc; margin-left: 1.5em;">')
                  .replace(/ ?data-list="bullet">?/gi, '')   // Remove data-list="bullet"> and any space before
                  .replace(/ ?data-list="bullet"/gi, '')     // Remove any stray data-list="bullet"
                  .replace(/ ?data-list="ordered">?/gi, '')  // Remove data-list="ordered"> and any space before
                  .replace(/ ?data-list="ordered"/gi, '')    // Remove any stray data-list="ordered"
              }}
            />
          </div>
        </div>

        <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          {
            playerData
              ? <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video' />
              : <img src={courseData.courseThumbnail} alt="" />
          }
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} alt="time left clock icon" />
              <p className="text-red-500">
                <span className="font-medium">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className="md:text-lg text-gray-500 line-through">{currency}{courseData.coursePrice}</p>
              <p className="md:text-lg text-gray-500">0% off</p>
            </div>
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>4.5</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>62 minutes</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="clock icon" />
                <p>12 lessons</p>
              </div>
            </div>
            <button onClick={() => setShowPaymentModal(true)} className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">What's in the course?</p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Provided Section */}
      <div className="my-12 px-4 py-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <img src={assets.blue_tick_icon} alt="tick" className="w-7 h-7" />
          Certification of Completion
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-2xl">
          Complete this course and receive an industry-recognized certificate to showcase your achievement and boost your career prospects.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Conditional rendering based on course title */}
          {courseData.courseTitle === "Data Science and Machine Learning" && (
            <>
              <img src={certificate1} alt="Certificate 1" className="h-36 rounded-lg shadow-md border" />
              <img src={certificate2} alt="Certificate 2" className="h-36 rounded-lg shadow-md border" />
            </>
          )}
          {courseData.courseTitle === "Cybersecurity & Ethical Hacking" && (
            <>
              <img src={certificate2} alt="Certificate 2" className="h-36 rounded-lg shadow-md border" />
              <img src={certificate3} alt="Certificate 3" className="h-36 rounded-lg shadow-md border" />
            </>
          )}
          {/* Default: show all certificates for other courses */}
          {courseData.courseTitle !== "Data Science and Machine Learning" &&
            courseData.courseTitle !== "Cybersecurity & Ethical Hacking" && (
              <>
                <img src={certificate1} alt="Certificate 1" className="h-36 rounded-lg shadow-md border" />
                <img src={certificate2} alt="Certificate 2" className="h-36 rounded-lg shadow-md border" />
              </>
            )}
        </div>
      </div>

      {/* Career Support & Job Opportunities */}
      <div className="my-12 px-4 py-10 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2 flex items-center gap-2">
          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0l-9-5m9 5l9-5" /></svg>
          Career Support & Job Opportunities
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl text-lg font-medium">
          Get Career-Ready with Industry Support
        </p>
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 01-8 0M12 14v7m-7-7a7 7 0 0114 0v7H5v-7z" /></svg>
              Personalized Job Assistance
            </h3>
            <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
              <li>Resume & LinkedIn profile optimization</li>
              <li>Mock interviews & technical screening</li>
              <li>Portfolio & GitHub project reviews</li>
            </ul>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 018 0v2m-4-4V7m0 0V3m0 4a4 4 0 00-4 4v4" /></svg>
              Interview Preparation Toolkit
            </h3>
            <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
              <li>Most-asked interview questions</li>
              <li>Role-specific skill assessments</li>
              <li>Insider tips from industry experts</li>
            </ul>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7v4a1 1 0 001 1h3v2a1 1 0 001 1h4a1 1 0 001-1v-2h3a1 1 0 001-1V7" /></svg>
              Global Job Market Insights
            </h3>
            <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
              <li>Trends in hiring for your field</li>
              <li>Job alerts & recommendations</li>
              <li>Salary guides by experience & region</li>
            </ul>
          </div>
        </div>

        {/* Career Paths */}
        <div className="w-full max-w-5xl mt-12">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Career Paths You Can Pursue</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Data Science & AI */}
            <div className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <h4 className="font-semibold text-blue-600 mb-2">For Data Science & AI</h4>
              <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                <li>Data Scientist</li>
                <li>Machine Learning Engineer</li>
                <li>AI Analyst</li>
                <li>Business Intelligence Developer</li>
              </ul>
            </div>
            {/* Cybersecurity & Ethical Hacking */}
            <div className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <h4 className="font-semibold text-blue-600 mb-2">For Cybersecurity & Ethical Hacking</h4>
              <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                <li>Security Analyst</li>
                <li>Penetration Tester</li>
                <li>SOC Analyst</li>
                <li>Cybersecurity Consultant</li>
              </ul>
            </div>
            {/* DevOps & Cloud Computing */}
            <div className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <h4 className="font-semibold text-blue-600 mb-2">For DevOps & Cloud Computing</h4>
              <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                <li>DevOps Engineer</li>
                <li>Site Reliability Engineer (SRE)</li>
                <li>Cloud Solutions Architect</li>
                <li>Infrastructure as Code (IaC) Specialist</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div className="w-full max-w-5xl mt-12">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Top Companies Hiring in These Domains</h3>
          <div className="flex flex-wrap gap-4 justify-center text-lg text-gray-700 font-medium">
            <span className="bg-blue-100 px-4 py-2 rounded-full">Google</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">Amazon</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">TCS</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">Deloitte</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">Microsoft</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">IBM</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">Infosys</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">Accenture</span>
            <span className="bg-blue-100 px-4 py-2 rounded-full">Startups & Unicorns</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">(Based on current trends and industry demand)</p>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        coursePrice={courseData.coursePrice}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        couponError={couponError}
        onStripePay={handleStripePay}
        onPaypalPay={handlePaypalPay}
      />

      <Footer />
    </>
  ) : <Loading />
};

export default CourseDetails;