import Course from "../models/Course.js"


// Get All Courses
export const getAllCourse = async (req, res) => {
    try {

        const courses = await Course.find({ isPublished: true, hidden: { $ne: true } })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator', select: 'name' })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get Course by Id
export const getCourseId = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('educator', 'name')
            .populate('enrolledStudents', 'name email');
        if (!course) {
            return res.json({ success: false, message: 'Course not found' });
        }
        res.json({ success: true, courseData: course });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};