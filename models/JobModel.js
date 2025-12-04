import mongoose, { Schema } from "mongoose";
import User from "./User";

const JobModel = new Schema({
    jobPoster:{
    type:String,
    required:[true, "Job Poster is requried"],
    ref:User
},

    jobTitle: {
        type: String,
        required: [true, "Job Title is Required"]
    },
   department: {
        type: String,
        required: [true, "Department is Required"]
    },
    companyName: {
        type: String,
        required: [true, "Company Name is Required"]
    },
    location: {
        type: String,
        required: [true, "Location Is Required"]
    },
    jobType: {
        type: String,
        required: [true, "Job type is required"]
    },
    status:{
        type:String,
        default:"active"
      

    },
    payType: {
        type: String,
        required: [true, "Pay Type is required"]
    },
    deadline: {
        type: String,
        required: [true, "Deadline is Required"]
    },
    description: {
        type: String
    },
  companyPerks: {
    type: [String]
},
    uploadFile: {
        type: String
    }
});

export default mongoose.models.Job || mongoose.model("Job", JobModel);
