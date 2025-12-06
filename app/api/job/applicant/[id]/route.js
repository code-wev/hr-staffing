import { connectDB } from "@/lib/db";
import ApplicationModel from "@/models/ApplicationModel";
import JobModel from "@/models/JobModel";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  await connectDB();
  const params = await context.params;

  try {
    // ✅ do NOT await
    const id = params.id;
    const response = await ApplicationModel.find({ job: id });

    return NextResponse.json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        message: error?.message,
      },
      { status: 500 }
    );
  }
};
