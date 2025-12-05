import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  await connectDB();
  const params = await context.params;

  try {
    // ✅ do NOT await
    const email = params.email;
    console.log(email, "email ayos na plz ");
    const response = await User.find({ email: email });

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
