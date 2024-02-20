"use client"

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import logo from '../app/assets/Reddit-Logo-500x281.png'
import Image from 'next/image'
import { useAuth } from '@/context/auth.context';
import Link from 'next/link'


function Login() {

    const [email, setEmail] = useState<string>('')    
    const [password, setPassword] = useState<string>('')
    const router = useRouter()
    const { setUser } = useAuth();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { email, password };
        try {
            const res = await axios.post('/api/login', data);
            setUser(true); 
            localStorage.setItem('user', JSON.stringify(true)); 
            router.push("/");
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <section className="bg-zinc-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
                src={logo}
                width={200}
                height={200}
                alt="Picture of the author"
            />
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-zinc-900 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center">
                        Sign In 
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className=" border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@company.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••" 
                                className=" border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center justify-between">
                            
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-orange-700 text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 ">
                                Sign in</button>
                        <p className="text-sm font-light text-gray-400 text-center">
                            Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Login