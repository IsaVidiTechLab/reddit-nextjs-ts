import connectMongoDB from "@/libs/db";
import Comment from "@/models/comment";
import  { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

interface Commentdata {
    newComment: string;
}

interface CommentdataGet {
    comment: string;
}

export async function PUT(req: NextRequest, {params}: {params: any}){
    try{
        const {id}: {id: string | null} = params;
        const { newComment : comment }: Commentdata = await req.json();
        await connectMongoDB();
        await Comment.findByIdAndUpdate(id, {comment});
        return NextResponse.json({message: 'Comment updated'}, {status: 200})
    } catch(error){
        return NextResponse.json({error: 'Error updating Comment'}, {status: 500})
    }
    
}