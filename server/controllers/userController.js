import Course from "../models/Course.js"
import { CourseProgress } from "../models/CourseProgress.js"
import { Purchase } from "../models/Purchase.js"
import User from "../models/User.js"
import stripe from "stripe"
import { clerkClient } from '@clerk/clerk-sdk-node'; // or your Clerk SDK import
import fetch from 'node-fetch';

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);



// Get User Data
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId;
        let user = await User.findById(userId);

        if (!user) {
            // Fetch Clerk user info
            const clerkUser = await clerkClient.users.getUser(userId);
            user = await User.create({
                _id: userId,
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                imageUrl: clerkUser.imageUrl || '', // <-- THIS LINE IS REQUIRED
                enrolledCourses: [],
            });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Purchase Course 
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const courseData = await Course.findById(courseId);
    if (!courseData) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const amount = (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2);

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: process.env.CURRENCY.toLowerCase(),
          product_data: { name: courseData.courseTitle },
          unit_amount: Math.floor(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/payment-cancel`,
      metadata: { courseId, userId }
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Users Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req, res) => {

    try {

        const userId = req.auth.userId

        const userData = await User.findById(userId)
            .populate('enrolledCourses')

        res.json({ success: true, enrolledCourses: userData.enrolledCourses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Update User Course Progress
export const updateUserCourseProgress = async (req, res) => {

    try {

        const userId = req.auth.userId

        const { courseId, lectureId } = req.body

        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (progressData) {

            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, message: 'Lecture Already Completed' })
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()

        } else {

            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })

        }

        res.json({ success: true, message: 'Progress Updated' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// get User Course Progress
export const getUserCourseProgress = async (req, res) => {

    try {

        const userId = req.auth.userId

        const { courseId } = req.body

        const progressData = await CourseProgress.findOne({ userId, courseId })

        res.json({ success: true, progressData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Add User Ratings to Course
export const addUserRating = async (req, res) => {

    const userId = req.auth.userId;
    const { courseId, rating } = req.body;

    // Validate inputs
    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
        return res.json({ success: false, message: 'InValid Details' });
    }

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.json({ success: false, message: 'Course not found.' });
        }

        const user = await User.findById(userId);

        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: 'User has not purchased this course.' });
        }

        // Check is user already rated
        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

        if (existingRatingIndex > -1) {
            // Update the existing rating
            course.courseRatings[existingRatingIndex].rating = rating;
        } else {
            // Add a new rating
            course.courseRatings.push({ userId, rating });
        }

        await course.save();

        return res.json({ success: true, message: 'Rating added' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const paypalCreateOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;

    console.log("Received courseId:", req.body.courseId); // Debugging log
    console.log("Origin:", origin); // Debugging log

    const course = await Course.findById(courseId);
    if (!course) return res.json({ success: false, message: "Course not found" });

    const price = (course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2);

    // Get PayPal access token
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const tokenData = await tokenRes.json();

    // Create order
    const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: price }
        }],
        application_context: {
          return_url: `${origin}/payment-success`,
          cancel_url: `${origin}/payment-cancel`
        }
      })
    });
    const orderData = await orderRes.json();

    // Debugging log
    console.log("PayPal Order Data:", orderData);

    const approvalUrl = orderData.links.find(link => link.rel === 'approve')?.href;
    if (!approvalUrl) {
      return res.status(500).json({ success: false, message: "Approval URL not found" });
    }

    res.json({ success: true, approvalUrl }); // ✅
  } catch (error) {
    console.error("PayPal Error:", error); // Debugging log
    res.json({ success: false, message: error.message }); // ✅ Correct
  }
};

export const purchaseCourseStripe = async (req, res) => {
  try {
    const { courseId, amount } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const courseData = await Course.findById(courseId);
    const userData = await User.findById(userId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data Not Found" });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: amount.toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: { name: courseData.courseTitle },
          unit_amount: Math.floor(amount * 100), // Convert to cents
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/payment-cancel`,
      line_items,
      mode: "payment",
      metadata: { purchaseId: newPurchase._id.toString() },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};