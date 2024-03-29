"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const [data, setData] = React.useState({ username: '' });
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      setUser(false); 
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (user) {
        const res =  axios.get("/api/me").then((res) => {
        setData({ username: res.data.data.username });
      }) .catch (error => console.log(error))
    } 
  }, [user]);

  if (user === false || !user) {
    return null || <nav></nav>;
  }

  

  return (
    <nav className="flex flex-direction-row justify-end bg-zinc-900 text-white p-5 items-center">
      {user && (
        <>
          <h1 className="mr-5 text-sm">Hello {data.username}</h1>
          <Link href="/my-posts">
            <p className='text-sm'>My Posts</p>
          </Link>
          <button onClick={handleLogout} className=" p-2 py-1 bg-orange-700 rounded-md ml-4 text-sm">Log Out</button>
          </>
        )}

    </nav>
  );
};

export default Navbar;
        


