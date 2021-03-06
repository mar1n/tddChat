const User = require("../db/model/user");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
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
                <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
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
      next(error)
    });
};

exports.activation = async (req, res, next) => {
  const { token } = req.body;
  
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async function (error) {
        if (error) {
          return res.status(401).json({
            error: "Expired link. Signup again.",
          });
        }
        const { name, email, password } = jwt.decode(token);
        try {
          await User.create([{ name, email, password }]);
          res.status(201).json({ message: "Account has been created!!!" });
        } catch (error) {
          next(error)
        }
      }
    );
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if(!user) {
    return res.status(400).json({
      error: "User with that email doesn't exist! Please signin."
    })
  }

  if(!user.authenticate(password)) {
    return res.status(400).json({
      error: "Email and password do not match!"
    })
  }

  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

  const { _id, name, role } = user;
  return res.status(201).json({
    message: "Login details are correct. Welcome in service.",
    token,
    user: { _id, name, email, role }
  })
}