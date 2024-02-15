"use client";

import React from 'react';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  
  const { user } = useAuth();
  const [data, setData] = React.useState<{ username: string }>({ username: '' });
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      setUser(null); 
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
}

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/me');
      setData({ username: res.data.data.username });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getUserDetails();
  }, []);

  if (!user) {
    return null;
  }
  

  return (
    <nav className="flex flex-direction-row justify-end bg-zinc-900 text-white p-5 items-center">
       
        {user && (
           <>
          <h1 className="mr-5 text-sm">Hello {data.username}</h1>
           <Link href="/my-posts">
            <p className='text-sm'>My Posts</p>
          </Link>
          <button onClick={handleLogout} className=" px-2 py-1 border border-orange-700 rounded-md ml-4 text-sm">Log Out</button>
          </>
        )}

    </nav>
  );
};

export default Navbar;


