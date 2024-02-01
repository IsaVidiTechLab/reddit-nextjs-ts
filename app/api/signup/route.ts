import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import connectMongoDB from "@/libs/db";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest){
    
    const { username, email, password } = await req.json()
    if(!username || !email || !password) {
        return NextResponse.json({ message: "Username, email and password are required" }, { status: 400 })   
    }
    await connectMongoDB()
    const isUserPresent = await User.findOne({ email })
    if(isUserPresent) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }
    const hashPassword = await bcrypt.hashSync(password, 10)

    try{
        await User.create({ username, email , password: hashPassword })
        const jwtSecret = process.env.JWT_SECRET as string;
        const token = jwt.sign({username, email }, jwtSecret, { expiresIn: '1hr' });
        const response = NextResponse.json({ message: "User created successfully" }, { status: 200 })
        response.cookies.set("token", token)
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Error creating User' }, { status: 500 });

    }

}