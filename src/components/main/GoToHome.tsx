"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { FaHome } from "react-icons/fa";


const GoToHome = () => {
    const [Scrolled, setScrolled] = useState(false);
    const route = useRouter();

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 200)
      } 
      window.addEventListener("scroll", handleScroll)
      
      return () => window.removeEventListener("scroll", handleScroll)

    }, [])

     

    

  return (
    <div>
        <div onClick={() => route.push("/")} className={`${Scrolled ? "opacity-100 visible" : "opacity-0 invisible"} cursor-pointer shadow-2xl transition-all duration-200 p-1 bg-gray-100 dark:bg-gray-800 rounded-md fixed  bottom-5 right-20 md:bottom-10 md:right-25`}>
            <FaHome className='w-10 h-10 text-teal-500 shadow-xl'></FaHome>
        </div>
    </div>
  )
}

export default GoToHome