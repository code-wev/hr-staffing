import { appliedJob } from "@/controller/ApplicationController";
import { NextResponse } from "next/server"

export const POST = async(req, res)=>{
    try {

        const data = await req.json();
        console.log(data, "aso data aso");
        const saved = await appliedJob(data);
        return NextResponse.json({
            message:"Success",
            data:saved
        }, {status:200})
        

        
    } catch (error) {

        console.log(error, 'kire mamur beta error');
        return NextResponse.json({
            error,
            message:error?.message
        }, {status:500})
    }
};


