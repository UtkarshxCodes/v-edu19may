import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoute.js'
import paypal from 'paypal-rest-sdk';

// Initialize Express
const app = express()

// Connect to database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors({ origin: true, credentials: true }))
app.use(clerkMiddleware())
app.use(express.json())

// PayPal configuration
paypal.configure({
  mode: 'live', // Use 'sandbox' for testing, 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.json() , clerkWebhooks)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks, async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const registrationId = event.data.object.metadata.registrationId;
    await Registration.findByIdAndUpdate(
      registrationId,
      { paid: true, paymentId: event.data.object.id }
    );
  }

  res.json({ received: true });
})
app.use('/api/educator', educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)

// Route to create a PayPal payment
app.post('/api/user/paypal-create-order', async (req, res) => {
  const { amount, description } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:5173/payment-success', // Update with your frontend success URL
      cancel_url: 'http://localhost:5173/payment-cancel', // Update with your frontend cancel URL
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'Course Purchase',
              sku: '001',
              price: amount.toFixed(2),
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: amount.toFixed(2),
        },
        description: description || 'Purchase of a course on V-Edu.',
      },
    ],
  };

  try {
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error('PayPal Error:', error);
        return res.status(500).json({ success: false, message: 'Failed to create PayPal payment.' });
      } else {
        const approvalUrl = payment.links.find((link) => link.rel === 'approval_url')?.href;
        if (!approvalUrl) {
          return res.status(500).json({ success: false, message: 'Approval URL not found.' });
        }
        res.json({ success: true, approvalUrl });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route to handle payment success
app.get('/api/user/paypal-success', async (req, res) => {
  const { paymentId, PayerID } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '1.00', // Replace with the actual amount
        },
      },
    ],
  };

  try {
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        console.error('PayPal Execute Error:', error);
        return res.redirect('http://localhost:5173/payment-failed'); // Update with your frontend failure URL
      } else {
        console.log('Payment Success:', payment);
        res.redirect('http://localhost:5173/payment-success'); // Update with your frontend success URL
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.redirect('http://localhost:5173/payment-failed'); // Update with your frontend failure URL
  }
});

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
});