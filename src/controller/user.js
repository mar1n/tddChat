const User = require("../db/model/user");
const sgMail = require("@sendgrid/mail");

exports.signup = async (req, res) => {
  const { email, name } = req.body;

  try {
    await User.create([{ email, name }]);
    res.status(200).json({ message: "done" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email is taken!!!",
      });
    }
  }
};

exports.sendEMailTest = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const { name } = req.body;
  const msg = {
    to: "cykcykacz@gmail.com", // Change to your recipient
    from: "szym0nd4widowicz@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        message: "Email has been sent!!!",
      });
      console.log("Email sent by ", name);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Uppss",
      });
    });
};
