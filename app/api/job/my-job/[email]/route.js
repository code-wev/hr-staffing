import { connectDB } from "@/lib/db";
import JobModel from "@/models/JobModel";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
    await connectDB();
    const email = await context.params;
    console.log(email?.email, "please take me");

    try {
      ; // ✅ do NOT await
        const email = await context.params;
    console.log(email?.email, "please take me");

        const allJob = await JobModel.find({ jobPoster: email?.email });

        return NextResponse.json({
            message: "Email received",
            data: allJob
        });
    } catch (error) {
        return NextResponse.json({
            error,
            message: error?.message
        }, { status: 500 });
    }
};
