import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, mobile, course } = req.body;

  // Use environment variables for credentials in production!
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. smtp.zoho.com, smtp.gmail.com
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER, // your SMTP user
      pass: process.env.SMTP_PASS, // your SMTP password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Course Registration" <${process.env.SMTP_USER}>`,
      to: 'support@v-edu.us',
      subject: 'New Course Registration',
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nCourse: ${course}`,
      html: `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Mobile:</b> ${mobile}<br/><b>Course:</b> ${course}`,
    });
    res.json({ success: true, message: "Registration received" }); // ✅ CORRECT
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}