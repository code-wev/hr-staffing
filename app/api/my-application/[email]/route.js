import { connectDB } from "@/lib/db";
import ApplicationModel from "@/models/ApplicationModel";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  await connectDB();
  const params = await context.params;

  try {
    // ✅ do NOT await
    const email = params.email;
    console.log(email, "hey amar personal email")
    const response = await ApplicationModel.find({ applicant:email }).populate("job");

    return NextResponse.json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log(error, "kire");
    return NextResponse.json(
      {
        error,
        message: error?.message,
      },
      { status: 500 }
    );
  }
};
