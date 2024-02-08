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


export async function DELETE(req: NextRequest) {
    try {
      const id: string | null = req.nextUrl.searchParams.get('id') as string;
      if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
      }
      await connectMongoDB();
      await Comment.findByIdAndDelete(id);
      return NextResponse.json({ message: 'Comment deleted' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting Comment' }, { status: 500 });
    }
  }
export async function POST(req : NextRequest){
    try{
        const {userId, postId, username,comment} : Commentdata = await req.json();
        await connectMongoDB();
        await Comment.create({userId,postId,username,comment});
        return NextResponse.json({message : 'Comment created'}, {status: 201})
    }catch(err)
    {
        return NextResponse.json({ error: 'Error creating Comment', err }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
  try {
    await connectMongoDB();
    const comments: Commentdata[] = await Comment.find()
    return NextResponse.json({comments})
  } catch(err) {
    return NextResponse.json({error: 'Error fetching posts',err}, {status: 500})
  }
}
