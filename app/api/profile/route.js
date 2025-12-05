import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { connectDB } from "@/lib/db";


// GET /api/profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const {
      _id,
      name,
      email,
      role,
      companyName,
      phoneNumber,
      location,
      profileImage,
    } = user;

    return NextResponse.json(
      {
        _id,
        name,
        email,
        role,
        companyName,
        phoneNumber,
        location,
        profileImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/profile
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();

    const allowedFields = [
      "name",
      "companyName",
      "phoneNumber",
      "location",
      "profileImage",
    ];

    const updates = {};

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updates },
      { new: true }
    ).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const {
      _id,
      name,
      email,
      role,
      companyName,
      phoneNumber,
      location,
      profileImage,
    } = user;

    return NextResponse.json(
      {
        _id,
        name,
        email,
        role,
        companyName,
        phoneNumber,
        location,
        profileImage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
