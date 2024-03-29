"use client"

import { SelectedGymContext } from '@/app/context/SelectedGymContext'
import React, { useContext, useRef } from 'react'
import GymItem from './gym-item'

function GymList({gymList}: any) {
    const elementRef= useRef(null);
    const selectedGym= useContext(SelectedGymContext)

    const slideRight=(element: any)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element: any)=>{
        element.scrollLeft-=500;
    }
  return (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg"  
            fill="none" viewBox="0 0 24 24" 
            onClick={()=>slideLeft(elementRef.current)} 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-8 h-8 absolute rotate-180 top-[35%]
            bg-primary cursor-pointer p-1 rounded-full text-secondary shadow-lg hover:opacity-100 opacity-50">
            <path strokeLinecap="round" 
                strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>

    <div className='flex overflow-scroll overflow-x-auto gap-4
        scrollbar-hide scroll-smooth' ref={elementRef}>
        {gymList?.map((item: any, index: any) => index<=7&&(
            <div key={index} onClick={()=>selectedGym?.setSelectedGym(item)}>
                <GymItem gym={item} />
            </div>
        ))}
    </div>

    <svg xmlns="http://www.w3.org/2000/svg"
        onClick={()=>slideRight(elementRef.current)} 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" 
        className="w-8 h-8 absolute right-0 top-[35%]
        bg-primary cursor-pointer p-1 rounded-full text-white shadow-lg hover:opacity-100 opacity-50">
        <path strokeLinecap="round" 
        strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </div>
  )
}

export default GymList