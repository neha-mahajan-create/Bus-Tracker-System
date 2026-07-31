const Contact = require("../models/Contact");
const transporter = require("../config/mail");

const createContact = async (req, res) => {
  try {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email to owner

await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: process.env.EMAIL_USER,

    subject: `📩 New Contact Message: ${subject}`,

    html: `

        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>

    `,

});

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
      contact,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createContact,
};