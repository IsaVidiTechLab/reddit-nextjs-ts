import connectMongoDB from "@/libs/db";
import Post from "@/models/post";
import  { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

interface Postdata {
    userId: Schema.Types.ObjectId;
    newImage: string;
    newDescription: string;
}

interface PostdataGet {
    userId: Schema.Types.ObjectId;
    image: string;
    description: string;
}

export async function GET(req: NextRequest, {params}: {params: any}){
    try{
        const {id}: {id: string | null} = params;
        await connectMongoDB();
        const post: PostdataGet | null = await Post.findOne({_id: id});
        return NextResponse.json({post});
    } catch(error){ 
        return NextResponse.json({error: 'Error fetching post'}, {status: 500})
    }
}