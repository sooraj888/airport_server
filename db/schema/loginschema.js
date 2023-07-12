const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  loginId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model("users", LoginSchema);

module.exports = { Login };
