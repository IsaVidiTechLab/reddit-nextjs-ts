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

export async function GET(req: NextRequest, {params}: {params: any}){
    try {
        console.log("PostId Handler")
        const {id}: {id: string | null} = params;
        const comment: Commentdata[] = await Comment.find({ postId: id });
        if (!comment) {
          return NextResponse.json({ msg: "Comment for this post not found" });
        }
        return NextResponse.json({ comment });
      } catch (err) {
        console.log("hello")
        return NextResponse.json({ err });
      }
  }