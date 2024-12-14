import { NextResponse} from "next/server"
import connectDB from "@/libs/mongodb";
import { validateEmail } from "@/libs/utils";
import User from "@/models/user"

export async function GET() {
    try
    {
        await connectDB();

        // Attempt to get users 
        const users = await User.find();

        if(users.length === 0){
            return NextResponse.json({ error: `No users found` },{ status: 404 });
        }

        return NextResponse.json({users});
    }catch(error)
    {
        console.error('Error in DELETE route:', error);
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try
    { 
        await connectDB();

        const body = await req.json();
        const {firstName, lastName, email, password} = body;

        // Validation
        if((!firstName || typeof firstName !== "string") || (!lastName || typeof lastName !== "string")){
            return NextResponse.json(
                { error: "Both a first and last name are required and must be a string" },
                { status: 400 }
              );
        }

        if(!email || typeof email !== "string" || !validateEmail(email)){
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
              );
        }

        if(!password){
            return NextResponse.json(
                { error: "Password is required" },
                { status: 400 }
            );
        }

        const newUser = await User.create(body);
        return NextResponse.json({newUser},{status: 201});
    }
    catch(error)
    {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong on the server" },
          { status: 500 }
        );
    }
}

// Delete a user via query parameters
export async function DELETE(req: Request){
    try
    {
        await connectDB();

        // Parse the query parameter from the request URL
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({error: 'Missing "id" query parameter'},{status: 400});
        }

        // Attempt to delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ error: `No resource found with id: ${id}` },{ status: 404 });
        }

        return NextResponse.json({message: `Deleted resource with id: ${deletedUser}`}, {status:200});

    }
    catch(error)
    {
        console.error('Error in DELETE route:', error);
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
    }
}
