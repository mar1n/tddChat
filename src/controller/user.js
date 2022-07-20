const User = require("../db/model/user");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, name, password } = req.body;
  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "10m" }
  );

  console.log("token", token);

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

exports.activation = async (req, res) => {
  const { token } = req.body;
  console.log('activation token', token);
  // if (token) {
  //   jwt.verify(
  //     token,
  //     process.env.JWT_ACCOUNT_ACTIVATION,
  //     function (err, decoded) {
  //       if (err) {
  //         console.log('jwt verify in account activation error',err);
  //       }

  //       const { user, name, password} = jwt.decode(token);
  //       console.log('user', user, 'name', name, 'password', password);
  //     }
  //   );
  // }
  res.status(200).json({ message: "Account has been created!!!"})
  // try {
  // } catch (err) {}
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
    .then((r) => {
      console.log("res", r);
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
