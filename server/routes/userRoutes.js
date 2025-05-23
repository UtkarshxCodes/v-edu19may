import express from 'express'
import { 
  addUserRating, 
  getUserCourseProgress, 
  getUserData, 
  purchaseCourse, 
  updateUserCourseProgress, 
  userEnrolledCourses,
  paypalCreateOrder,
  purchaseCourseStripe
} from '../controllers/userController.js';
import { stripeWebhooks } from '../controllers/webhooks.js';

const userRouter = express.Router()

// Get user Data (used for Clerk login and user info)
userRouter.get('/data', getUserData)

// Purchase a course (Stripe payment)
userRouter.post('/purchase', purchaseCourse);

// Purchase a course (Stripe payment initiation)
userRouter.post('/purchase-stripe', purchaseCourseStripe); // Stripe payment initiation

// Get all courses the user is enrolled in
userRouter.get('/enrolled-courses', userEnrolledCourses)

// Update course progress (when user completes a lecture)
userRouter.post('/update-course-progress', updateUserCourseProgress)

// Get course progress for a user and course
userRouter.post('/get-course-progress', getUserCourseProgress)

// Add a rating to a course
userRouter.post('/add-rating', addUserRating)

// Create PayPal order
userRouter.post('/paypal-create-order', paypalCreateOrder);

// Stripe webhook
userRouter.post('/stripe-webhook', express.raw({ type: 'application/json' }), stripeWebhooks);

export default userRouter;