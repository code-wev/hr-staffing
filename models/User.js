// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    companyName:String,  // client
    phoneNumber:String,
    locaton:String,

    // "client" or "applicant" from your tabs
    role: {
      type: String,
      enum: ["client", "applicant", "admin"],
      default: "client",
    },
  },
  { timestamps: true }
);

// Avoid recompiling model on hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
