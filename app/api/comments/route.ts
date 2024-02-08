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

export async function POST(req : NextRequest){
    try{
        const {userId, postId, username, newComment: comment} : Commentdata = await req.json();
        await connectMongoDB();
        await Comment.create({userId,postId,username,comment});
        return NextResponse.json({message : 'Comment created'}, {status: 201})
    }catch(err)
    {
        return NextResponse.json({ error: 'Error creating Comment', err }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
    try{
        await connectMongoDB();
        const comments: Commentdata[] = await Comment.find({postId: req.nextUrl.searchParams.get('id')});
        return NextResponse.json({comments});
    } catch(error){ 
        return NextResponse.json({error: 'Error fetching comments'}, {status: 500})
    }
}
