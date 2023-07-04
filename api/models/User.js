const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    validate:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
