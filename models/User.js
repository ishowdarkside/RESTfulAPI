const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    validate: [
      {
        validator: function (data) {
          return data.match(/^[a-zA-Z0-9\s]+$/);
        },
        message: "Invalid inputs for name!",
      },
    ],
  },
  email: {
    type: "String",
    unique: true,
    validate: {
      validator: function (data) {
        return data.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
      },
      message: "Invalid email!",
    },
  },
  password: {
    type: "String",
    minlength: [8, "Minimum length for password is 8 characters"],
    maxLength: [30, "Maximum length for password is 30 characters"],
  },
  passwordChangedAt: {
    type: Date,
  },
  recipesTotal: {
    type: Number,
    default: 0,
  },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

//Hash password if account is new or password was changed
UserSchema.pre("save", async function (next) {
  if (!this.isNew || !this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.checkJWTValidity = function (iat) {
  if (!this.passwordChangedAt) return true;
  if (iat * 1000 < this.passwordChangedAt.getTime()) return false;
  else return true;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
