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

