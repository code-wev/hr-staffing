import { deleteJob } from "@/controller/JobController";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
    await connectDB();
    const params = await context.params;


    try {
      ; // ✅ do NOT await
        const id = params.id;
        const deleted = await deleteJob(id);
        
 

        return NextResponse.json({
            message: "Delete Successfully",
            data: deleted
        });
    } catch (error) {
        return NextResponse.json({
            error,
            message: error?.message
        }, { status: 500 });
    }
};
