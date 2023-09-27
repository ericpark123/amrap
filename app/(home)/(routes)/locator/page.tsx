"use client"

import { GoogleMapsView } from "@/app/(components)/ui/custom/map/google-map-view"
import { useEffect, useState } from 'react'
import { UserLocationContext } from "@/app/context/UserLocationContext"
import GymList from "@/app/(components)/ui/custom/map/gym-list"

export default function Locator() {
    const [userLocation, setUserLocation]= useState({lat: 0, lng: 0})
    const [gymList, setGymList]= useState([])

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
    
    useEffect(() => {
        fetch('/api/google-places', {
            method: "GET",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            setGymList((await res.json()).data.result.results)
        }).catch((error) => {
            console.log(error)
        })
        
    },[])

    return (
        <div className="container relative">
            <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
                <GoogleMapsView/>
                <GymList gymList={gymList}/>
            </UserLocationContext.Provider>
        </div>
    )
}
