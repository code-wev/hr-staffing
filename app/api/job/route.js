import { saveJob } from "@/controller/JobController";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server"

export const POST = async(req, res)=>{

    await connectDB();
    try {

        const data =await req.json();
        console.log(data, "Job data");
        const saved = await saveJob(data);
    
        return NextResponse.json({
            message:"Success",
            data:saved
        }, {status:200})
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({
            error,
            message:error?.message
        }, {status:500})
    }
}

