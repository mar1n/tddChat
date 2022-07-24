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

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      message: "Emial has been taken!!!",
    });
  }

  const msg = {
    to: "cykcykacz@gmail.com", // Change to your recipient
    from: "szym0nd4widowicz@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
  };

  sgMail
    .send(msg)
    .then((r) => {
      res.status(200).json({
        message: "Email has been sent!!!",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Uppss",
      });
    });
};

exports.activation = async (req, res) => {
  const { token } = req.body;
  
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async function (err) {
        if (err) {
          return res.status(401).json({
            message: "Expired link. Signup again.",
          });
        }
        const { name, email, password } = jwt.decode(token);
        try {
          await User.create([{ name, email, password }]);
          res.status(201).json({ message: "Account has been created!!!" });
        } catch (error) {
          res.status(500).json({
            message: "Problem with Database",
            error
          })
        }
      }
    );
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
      res.status(200).json({
        message: "Email has been sent!!!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Uppss",
      });
    });
};
