"use client"

import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'

export function GoogleMapsView() {
    const defaultLocation = {lat: 0, lng: 0}

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
    // Pass user location state into global context
    const [userLocation, setUserLocation]= useState<google.maps.LatLngLiteral>(defaultLocation)

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function(pos) {
            setUserLocation({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude 
            })
        })
    }
    useEffect(()=>{
        getUserLocation();
    },[])

    return (
        <div>
            <LoadScript
                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                mapIds={['a9de813b21593ac2']}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation} 
                    options={{mapId:'a9de813b21593ac2'}}
                    zoom={13}
                >
                    <MarkerF
                        position={userLocation}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}