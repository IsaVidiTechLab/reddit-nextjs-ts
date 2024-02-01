import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import connectMongoDB from "@/libs/db";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest){
    try{
     await connectMongoDB()
    const { email, password } = await req.json()
    if(!email || !password) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })   
    }
    
    const isUserPresent = await User.findOne({ email })
    if(!isUserPresent) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 400 })
    }
    const isMatch = await bcrypt.compare(password, isUserPresent.password)
    if(!isMatch) {
        return NextResponse.json({ message: "Invalid password" }, { status: 400 })
    }

    // const hashPassword = await bcrypt.hashSync(password, 10)
        const jwtSecret = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: isUserPresent._id, username: isUserPresent.username, email }, jwtSecret, { expiresIn: '1d' });
        const response = NextResponse.json({ authToken: token }, { status: 200 })
        response.cookies.set("token", token)
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Error creating User' }, { status: 500 });

    }

}