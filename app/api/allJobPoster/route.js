import User from "@/models/User"
import { NextResponse } from "next/server"

export const GET = async(req, res)=>{
    try {

        const allClient = await User.find({role:"client"}
           
        );

        
        return NextResponse.json({
            message:"Success",
            data:allClient

        }, {status:200})
        
    } catch (error) {
        return NextResponse.json({
            error,
            message:error?.message
        }, {status: 500})
    }
}