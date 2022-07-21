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
  if(userExist) {
    return res.status(400).json({
      message: "Emial has been taken!!!"
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

exports.activation = async (req, res) => {
  const { token } = req.body;
  console.log("activation token", token);
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log('jwt verify in account activation error',err);
          return res.status(400).json({
            message: `Token has been expired!!`
          })
        }
        res.status(200).json({ message: "Account has been created!!!" });
        // const { user, name, password} = jwt.decode(token);
        // console.log('user', user, 'name', name, 'password', password);
      }
    );
  } else {

    res.status(401).json({ message: "Where is token!!!" });
  }
  // try {
  //   await User.create([{ email, name, hashed_password: password }]);
  //   res.status(200).json({ message: "done" });
  // } catch (err) {
  //   if (err.code === 11000) {
  //     return res.status(400).json({
  //       message: "Email is taken!!!",
  //     });
  //   }
  // }
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
