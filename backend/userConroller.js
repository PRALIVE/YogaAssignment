const User = require("./databasemodel/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("./config/generateToken");

const registerUser = async function(req,res){
    try {
        const {name:name,email:email,password:password, age:age, pic:pic} = req.body;

        const UserExists = await User.findOne({email:email});
        if(UserExists){
            throw new Error("User already Exists");
        }

        const saltRounds = 10;
        const PlainPassword = password;
        const hashPassword = bcrypt.hashSync(PlainPassword,saltRounds);

        const user = await User.create({
            name:name,
            email:email,
            password:hashPassword,
            age:age,
            batch:"none",
            paymentStatus:"pending",
            pic:pic,
        });

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            password: user.password,
            pic: user.pic,
            batch: user.batch,
            paymentStatus: user.paymentStatus,
            month: user.month,
            token: generateToken(user._id),
          });
        } else {
          res.status(400);
          throw new Error("User not found");
        }

    } catch (error) {
        console.log(error);
        process.exit();
    }
};

const loginUser = async function(req,res){
    try {
        const { email: email, password: password } = req.body;

        const user = await User.findOne({ email: email });
        if (user && (await bcrypt.compareSync(password, user.password))) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            pic: user.pic,
            batch: user.batch,
            paymentStatus: user.paymentStatus,
            month: user.month,
            token: generateToken(user._id),
          });
        } else {
          res.status(401);
          throw new Error("Invalid Email or Password");
        }
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

const payment= async function (req, res) {
  try {
    const { email: email, batch: batch, month : month} = req.body;

    const user1 = await User.findOneAndUpdate({ email: email },{batch : batch, paymentStatus: "Rs 500", month : month});
    const user = await User.findOne({ email: email });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        pic: user.pic,
        batch: user.batch,
        paymentStatus: user.paymentStatus,
        month: user.month,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Payment not Successful");
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const newpayment = async function (req, res) {
  try {
    const { email: email} = req.body;

    const user1 = await User.findOneAndUpdate(
      { email: email },
      { paymentStatus: "pending", month: "none" }
    );
    const user = await User.findOne({ email: email });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        pic: user.pic,
        batch: user.batch,
        paymentStatus: user.paymentStatus,
        month: user.month,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("New Payment not Successful");
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};


module.exports = {registerUser,loginUser, payment, newpayment};