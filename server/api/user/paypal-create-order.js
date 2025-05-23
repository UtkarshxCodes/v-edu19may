import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_SECRET;
  const { origin } = req.headers;

  // Debug: Log credentials (remove in production)
  console.log("PayPal CLIENT_ID:", clientId);
  console.log("PayPal Origin:", origin);

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    // 1. Get access token
    const authRes = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const authText = await authRes.clone().text();
    console.log("PayPal Auth Response:", authText);
    const { access_token } = JSON.parse(authText);

    // 2. Create order
    const orderRes = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '99.00'
            },
            description: 'Course Registration'
          }
        ],
        application_context: {
          return_url: `${origin}/payment-success`,
          cancel_url: `${origin}/payment-cancel`
        }
      })
    });
    const orderText = await orderRes.clone().text();
    console.log("PayPal Order Response:", orderText);
    const orderData = JSON.parse(orderText);
    const approvalUrl = orderData?.links?.find(link => link.rel === 'approve')?.href;

    if (approvalUrl) {
      return res.json({ success: true, approvalUrl });
    } else {
      return res.status(500).json({ success: false, message: 'Approval URL not found', orderData });
    }
  } catch (err) {
    console.error("PayPal Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;