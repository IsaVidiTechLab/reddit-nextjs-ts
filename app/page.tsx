"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState("")

  const router = useRouter()
  const logout = async () => {
    try{
      await axios.get('/api/logout')
      router.push("/login")

    } catch (error) {
      console.log(error)
    }
  }

  const getUserDEtails = async () => { 
    try{
      const res = await axios.get('/api/me')
      console.log(res.data)
      setData(res.data.data.username)
    } catch (error) {
      console.log(error)
  }
  }

  useEffect(() => {
    getUserDEtails()
  }, [])

  
  return (
    <>
    {data === "" ? <h1>Loading...</h1> : null}
    <h1>Hello {data}</h1>
    <button className="border border-slate-800" onClick={logout}>Log Out</button>
    </>
   
  );
}
