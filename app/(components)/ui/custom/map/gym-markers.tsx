import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'

function Markers({gym}) {
    const [selectedGym, setSelectedGym]=useState()
    return (
        <div>
            <MarkerF
                position={gym.geometry.location}
                onClick={()=>setSelectedGym(gym)}
                icon={{
                  url:'/circle.png'
                }}   
            >     
            </MarkerF>
        </div>
    )
}