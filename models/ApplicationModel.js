import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    applicant: {
      type: String,
      required: [true, "Applicant email is required"],
      ref: "User", // Reference User Model
    },

    job: {
      type: Schema.Types.ObjectId,
      required: [true, "Job ID is required"],
      ref: "Job", // Reference Job Model
    },

    cv: {
      type: String,
      required: [true, "CV/Resume file is required"],
    },
    status:{
      type:String,
      default:""
    },

    coverLetter: {
      type: String,
      default: "",
    },
    phoneNumber:{
        type:String,
        required:[true,, "Phone Number is required"]
    },

    expectedSalary: {
      type: Number,
      default: null,
    },
    
jobPoster:String,

    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    }
  },

  { timestamps: true } 
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
