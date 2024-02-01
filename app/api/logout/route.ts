import { NextResponse } from "next/server";

export async function GET(){
    try{
        const res = NextResponse.json({message: "Logout successful"});
        res.cookies.set("token", "", { 
            httpOnly: true,
            expires: new Date(0)
        })
        return res;
    } 
    catch (error) {
        console.error(error);
        return NextResponse.error();
    }

}