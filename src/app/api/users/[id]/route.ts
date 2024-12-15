import { NextResponse, NextRequest} from "next/server"
import connectDB from "@/libs/mongodb";
import User from "@/models/user"
import { validateEmail } from "@/libs/utils";

export async function GET({ params }: { params: { id: string } }){
    try {
        await connectDB();
        const { id } = await params;

        const user = await User.findById(id);
        
        if(!user){
            return NextResponse.json({ error: `No user found with ID: ${id}`}, {status:404});
        }

        return NextResponse.json({message:`successfully found user:\n ${user}`}, {status:200});
    }
    catch(error)
    {
        console.log(error);
        return NextResponse.json( { error: "Something went wrong on the server" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
    try{
        await connectDB();

        const { id } = await params;

        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return NextResponse.json({ error: `No user found with ID: ${id}`}, {status:404});
        }

        return NextResponse.json({message:`successfully deleted user:\n ${deletedUser}`}, {status:200});
    }
    catch(error)
    {
        console.log(error);
        return NextResponse.json( { error: "Something went wrong on the server" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }){
    try {
        await connectDB();

        const { id } = await params;
        const body = await req.json();

        const{firstName, lastName, email} = body;

        //Validation
        if (!firstName && !lastName && !email) {
            return NextResponse.json(
            { error: "You must provide at least one field to update (firstName, lastName, or email)" }, { status: 400 });
        }

        if(email && (typeof email !== 'string' || !validateEmail(email))){
            return NextResponse.json({error: "Must use a valid email"}, {status: 400});
        }

        // Attempt to update User
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { 
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(email && { email })
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json( { error: `No user found with ID: ${id}` }, { status: 404 } );
        }

        return NextResponse.json({message:`User succesfully updated:\n ${updatedUser}` }, {status: 200});
    }
    catch(error)
    {
        console.log(error);
        return NextResponse.json( { error: "Something went wrong on the server" }, { status: 500 });
    }
}