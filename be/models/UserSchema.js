const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  admin: [String],
  member: [String]
});

module.exports = mongoose.model("User", UserSchema);