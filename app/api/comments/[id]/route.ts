import connectMongoDB from "@/libs/db";
import Comment from "@/models/comment";
import  { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";



interface Commentdata {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    username: string;
    newComment: string;
}

interface CommentdataGet {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    username: string;
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
export async function GET(req: NextRequest, {params}: {params: any}){
    try{
        const {id}: {id: string | null} = params;
        await connectMongoDB();
        const comment: CommentdataGet | null = await Comment.findOne({_id: id});
        return NextResponse.json({comment});
    } catch(error){ 
        return NextResponse.json({error: 'Error fetching post'}, {status: 500})
    }
}
