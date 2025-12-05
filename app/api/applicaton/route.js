import { appliedJob } from "@/controller/ApplicationController";
import ApplicationModel from "@/models/ApplicationModel";
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


export const PUT = async(req, res)=>{

    

    try {
        const data = await req.json();
        const {id, status} = data;

        console.log(id, status, "kire madrcht");

        const updated = await ApplicationModel.updateOne({_id:id},{$set:{
          applicationStatus:status
        }});


        return NextResponse.json({
            message:"Success",
            data:updated

        }, {status:201})



    } catch (error) {
        console.log(error, "kire lam sam error");
        return NextResponse.json({
            error,
            message:error?.message
        }, {status:500})
    }
}