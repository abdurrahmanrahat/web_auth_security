const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

// encryption password
// const encKey = process.env.ENC_KEY;
// userSchema.plugin(encrypt, {
//   secret: encKey,
//   encryptedFields: ["password"],
// });

// export const UserModel = mongoose.model("user", userSchema);
module.exports = mongoose.model("user", userSchema);
