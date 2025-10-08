const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { fullName, email, message, companyName, phoneNumber } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
  from: process.env.CONTACT_EMAIL, // your authenticated Gmail
  to: process.env.CONTACT_EMAIL,
  subject: `New Message from ${fullName}`,
  text: `
    Name: ${fullName}
    Email: ${email}
    Company: ${companyName}
    Phone: ${phoneNumber}
    Message: ${message}
  `,
};

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
