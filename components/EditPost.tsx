"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function EditPost({id, image, description}: {id: string, image: string, description: string}) {
  const [newImage, setNewImage] = useState(image);
  const [newDescription, setnewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try{
      const res = await fetch ("/api/posts/"+id, 
      {method: "PUT",
      headers : {"Content-type":"application/json"},
      body : JSON.stringify({newImage, newDescription})
  })
    if(!res.ok){
      throw new Error("Failed to update Todo")
    }
    router.push("/")
    router.refresh()
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} >
        <input 
          type="text" 
          value = {newImage}
          onChange={(e)=>{setNewImage(e.target.value)}}
          placeholder='Post Image'/>
        <input 
            type="text" 
            value = {newDescription}
            onChange={(e)=>{setnewDescription(e.target.value)}}
            placeholder='Post Description'/>
        <button >Edit Post</button>
    </form>
  )
}

export default EditPost