const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  admin: [String],
  member: [{teamId: String, accepted: Boolean}]
});

module.exports = mongoose.model("User", UserSchema);