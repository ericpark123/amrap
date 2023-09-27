"use client"

import React, { useContext } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { UserLocationContext } from '@/app/context/UserLocationContext'
import GymMarkers from './gym-markers'

export function GoogleMapsView({gymList} : any) {
    const currentUser = useContext(UserLocationContext)

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

    return (
        <div>
            <LoadScript
                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                mapIds={['a9de813b21593ac2']}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentUser!.userLocation} 
                    options={{mapId:'a9de813b21593ac2'}}
                    zoom={13}
                >
                    <MarkerF
                        position={currentUser!.userLocation}
                    />
                    {gymList.map((item: any, index: any) => index<=7&&(
                        <GymMarkers gym={item} key={index}/>
                    ))}      
                </GoogleMap>
            </LoadScript>
        </div>
    )
}