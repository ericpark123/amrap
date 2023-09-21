"use client"

import React, { useContext, useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
// import { UserLocationContext } from '@/context/UserLocationContext'

export function GoogleMapsView() {
    // const {userLocation, setUserLocation}=useContext<google.maps.MapOptions | null>(UserLocationContext)
    // const [map, setMap]=useState();
    let GOOGLE_MAPS_API_KEY: string
        if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
            GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        } else {
        throw new Error("Environment variable is not set")
        }
    const containerStyle= {
        width:'100%',
        height:'70vh',
    }
    const coordinate = { lat: -34.397, lng: 150.644}
    return (
        <div>
            <LoadScript
                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                mapIds={['a9de813b21593ac2']}
            >
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={coordinate} 
                options={{mapId:'a9de813b21593ac2'}}
                zoom={13}
                >
                    
                </GoogleMap>
            </LoadScript>
        </div>
    )
}