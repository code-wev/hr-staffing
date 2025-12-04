import { connectDB } from "@/lib/db"
import ApplicationModel from "@/models/ApplicationModel";
import JobModel from "@/models/JobModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
  await connectDB();

  try {
    const data = await req.json();
    const email = data.email;

    const totalJob = await JobModel.countDocuments({ jobPoster: email });

    const totalActiveJob = await JobModel.countDocuments({
      jobPoster: email,
      status: "active",
    });

    const totalAplication = await ApplicationModel.countDocuments({
      jobPoster: email,
    });

    return NextResponse.json({
      message: "Success",
      totalJob,
      totalActiveJob,
      totalAplication,
    });
  } catch (error) {
    console.log(error, "error khamsa");
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
