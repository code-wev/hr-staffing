import ApplicationModel from "@/models/ApplicationModel";
import JobModel from "@/models/JobModel";
import User from "@/models/User"
import { NextResponse } from "next/server"

export const GET = async (req, res)=>{
    try {

        const allJobPoster = await User.countDocuments({role:"client"});
        const candidate = await User.countDocuments({role:"applicant"});
        const totalJob = await JobModel.countDocuments();
        const totalApplication = await ApplicationModel.countDocuments();

        return NextResponse.json({

            allJobPoster,
            candidate,
            totalJob,
            totalApplication


        }, {status:200})

        
    } catch (error) {
        return NextResponse.json({
            error,
            message:error?.message
        }, {status:500})
    }
}