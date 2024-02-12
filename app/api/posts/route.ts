import connectMongoDB from "@/libs/db";
import Post from "@/models/post";
import  { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

interface Postdata {
    userId: Schema.Types.ObjectId;
    username: string;
    image: string;
    description: string;
}

export async function POST(req : NextRequest){
    try{
        const {userId, username, image, description} : Postdata = await req.json();
        await connectMongoDB();
        await Post.create({userId, username, image,description});
        return NextResponse.json({message : 'Post created'}, {status: 201})
    }catch(err)
    {
        return NextResponse.json({ error: 'Error creating Post', err }, { status: 500 });
    }
}

export async function GET() {
    try {
      await connectMongoDB();
      const posts: Postdata[] = await Post.find()
      return NextResponse.json({posts})
    } catch(err) {
      return NextResponse.json({error: 'Error fetching posts',err}, {status: 500})
    }
  }

export async function DELETE (req: NextRequest){
    const id = req.nextUrl.searchParams.get('id')
    await connectMongoDB()
    await Post.findByIdAndDelete(id)
    return NextResponse.json({message: 'Post deleted'}, {status: 200})
}