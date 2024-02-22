"use client"
import React from 'react'
import { useRouter } from 'next/navigation';


function RemovePost({ id }: { id: string }) {

    const router = useRouter()
    const removePost = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        const confirmed = confirm("Are you sure?");
        if(confirmed)
        {
            const res = await fetch("/api/posts/" + id,{method: "DELETE"} )
            if(res.ok)
            {
                router.refresh()
            }
            
        }
    }

  return (
    <button className='text-red-400' onClick={(e)=>removePost(e)}>
      Remove Post
    </button>

  )
}

export default RemovePost
