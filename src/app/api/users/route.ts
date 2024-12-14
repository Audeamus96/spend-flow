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
    const data = await req.json()
    const newUser = await User.create(data);
    return NextResponse.json({newUser},{status: 201});
}

export async function DELETE(req: Request){
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    const deletedUser = await User.findByIdAndDelete(id);
    return NextResponse.json({message: `User successfully deleted: ${deletedUser}`}, {status:200});
}
