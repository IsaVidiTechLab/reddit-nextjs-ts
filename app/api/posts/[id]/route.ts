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

export async function PUT (req: NextRequest, params: {id: string}){
    const { id } = params;
    const { newImage: image, newDescription: description }: Postdata = await req.json();
    await connectMongoDB()
    await Post.findByIdAndUpdate(id, {image, description})
    return NextResponse.json({message: 'Post updated'}, {status: 200})
}