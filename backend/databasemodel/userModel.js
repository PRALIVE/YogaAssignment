const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true },
    password:{type: "String", required: true},
    age: { type: "Number", required: true },
    batch: { type: "String", required : true,default:"none"},
    paymentStatus: { type: "String", required : true, default: "pending" },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    month : { type: "String" , required: true, default: "none"},
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;