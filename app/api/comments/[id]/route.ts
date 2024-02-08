import connectMongoDB from "@/libs/db";
import Comment from "@/models/comment";
import  { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";



interface Commentdata {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    username: string;
    comment: string;
}

interface CommentdataGet {
    comment: string;
}

export async function GET(req: NextRequest, {params}: {params: any}){
    try{
        const {id}: {id: string | null} = params;
        await connectMongoDB();
        const comment: CommentdataGet[] = await Comment.find({commentId: id});
        return NextResponse.json({comment});
    } catch(error){ 
        return NextResponse.json({error: 'Error fetching comments'}, {status: 500})
    }
}
