"use client"
import React, { useEffect, useState } from 'react';
import  { Schema } from "mongoose";
import Link from 'next/link';

interface Postdata {
    userId: Schema.Types.ObjectId;
    username: string;
    image: string;
    description: string;
}

const getPosts = async() : Promise<Postdata[]> =>{
    try {
        const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
        
        if (!res.ok) {
          throw new Error("Failed to fetch the Posts");
        }
    
        const response = await res.json();
    
        console.log("Response from server:", res);
    
        if (!Array.isArray(response.posts)) {
          throw new Error("Invalid data format from the server");
        }
    
        return response.posts;
      } catch (err) {
        console.error(err);
        return [];
      }
}

function PostList() {

    const [posts, setPosts] = useState<Postdata[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: Postdata[] = await getPosts();
        setPosts(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
      <>

     <button className="max-w-sm bg-orange-700 rounded-lg shadow px-28 py-8 text-2xl text-white">
        Create Post
      </button>

      {
        posts && posts.map((p : Postdata) =>(
            <div className="max-w-sm bg-zinc-900 rounded-lg shadow p-4 ">
            <h6 className="mb-2 text-lg font-bold tracking-tight text-white">{p.username}</h6>
            <a href="#">
                <img className="rounded-t-lg" src={p.image} alt="" />
            </a>
            <div className="p-5">
                <p className="mb-3 font-normal text-white">{p.description}</p>
                <Link href="#" className="mb-2 font-normal text-orange-600">Load Comments</Link>
            </div>
        </div>
        ))
      }
         
      </>

  )
}

export default PostList
