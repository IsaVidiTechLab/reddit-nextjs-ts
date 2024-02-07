import connectMongoDB from "@/libs/db";
import Post from "@/models/post";
import  { Schema } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

interface Commentdata {
    userId: Schema.Types.ObjectId;
    image: string;
    description: string;
}