"use client"

import { GoogleMapsView } from "@/app/(components)/ui/custom/map/google-map-view"
import { useEffect, useState } from 'react'
import { UserLocationContext } from "@/app/context/UserLocationContext"
import GymList from "@/app/(components)/ui/custom/map/gym-list"
import { SelectedGymContext } from "@/app/context/SelectedGymContext"

export default function Locator() {
    const [userLocation, setUserLocation]= useState({lat: 0, lng: 0})
    const [selectedGym, setSelectedGym]= useState({})
    const [gymList, setGymList]= useState([])

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function(pos) {
            setUserLocation({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude 
            })
        })
    }

    
    useEffect(() => {
        getUserLocation();
        fetch('/api/google-places', {
            method: "GET",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            setGymList((await res.json()).result.results)
        }).catch((error) => {
            console.log(error)
        })
        
    },[])

    return (
        <div className="container relative">
            <SelectedGymContext.Provider value={{selectedGym, setSelectedGym}}>
            <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
                <div className="col-span-3">
                    <GoogleMapsView gymList={gymList}/>
                    <div className="md:absolute mx-2 w-[100%] md:w-[91%] bottom-36 relative md:bottom-3">
                        <GymList gymList={gymList}/>
                    </div>
                </div>
            </UserLocationContext.Provider>
            </SelectedGymContext.Provider>
        </div>
    )
}
