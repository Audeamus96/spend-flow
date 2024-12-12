import { NextResponse} from "next/server"
import connectDB from "@/libs/mongodb";
import User from "@/models/user"

export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({users});
}

export async function POST(req: Request) {
    await connectDB();
    const data = req.json()
    const newUser = await User.create(data);
    return NextResponse.json(newUser);
}

