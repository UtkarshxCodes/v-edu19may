import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({ course, onEnroll }) => {
    const { currency } = useContext(AppContext)

    return (
        <div className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg">
            <Link onClick={() => scrollTo(0, 0)} to={'/course/' + course._id} className="block">
                <img className="w-full" src={course.courseThumbnail} alt='' />
                <div className="p-3 text-left">
                    <h3 className="text-base font-semibold">{course.courseTitle}</h3>
                    <p className="text-gray-500">
                        David Watts
                    </p>
                    <div className="flex items-center space-x-2">
                        <p>4.5</p>
                        <div className="flex">
                            {[...Array(4)].map((_, i) => (
                                <img
                                    key={i}
                                    className="w-3.5 h-3.5"
                                    src={assets.star}
                                    alt=""
                                />
                            ))}
                            <img
                                className="w-3.5 h-3.5"
                                src={assets.star_half || assets.star}
                                alt=""
                            />
                        </div>
                        <p className="text-blue-600">(71 ratings)</p>
                        <p>62 students</p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
                    <p className="md:text-lg text-gray-500">0% off</p>
                    <div className="flex items-center gap-1">
                        <img src={assets.time_clock_icon} alt="clock icon" />
                        <p>62 minutes</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={assets.lesson_icon} alt="clock icon" />
                        <p>12 lessons</p>
                    </div>
                </div>
            </Link>
            <button onClick={() => onEnroll(course)}>Enroll Now</button>
        </div>
    )
}

export default CourseCard