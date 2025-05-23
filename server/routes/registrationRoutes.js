import express from 'express';
import { sendRegistrationEmail, registrationStripeCheckout, registrationPaypalOrder, markRegistrationPaidPaypal } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/send-registration', sendRegistrationEmail);
router.post('/registration-stripe', registrationStripeCheckout);
router.post('/registration-paypal', registrationPaypalOrder);
router.post('/registration-paypal-paid', markRegistrationPaidPaypal);

export default router;