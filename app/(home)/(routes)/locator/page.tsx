import { GoogleMapsView } from "@/app/(components)/ui/custom/map/google-map-view"
import UserLocationContext from "@/context/UserLocationContext";
import { useEffect, useState } from "react";
  
export default async function Locator() {

    // const [userLocation, setUserLocation]=useState<google.maps.LatLngLiteral | null>(null);
    // useEffect(()=>{
    //     getUserLocation();
    // },[])
    // const getUserLocation=()=>{
    //     navigator.geolocation.getCurrentPosition(function(pos) {
    //     setUserLocation({
    //         lat:pos.coords.latitude,
    //         lng:pos.coords.longitude 
    //     })
    //     })
    // }
    return (
        <div className="container relative">
            {/* <UserLocationContext.Provider value={{userLocation, setUserLocation}}> */}
                <GoogleMapsView/>
            {/* </UserLocationContext.Provider> */}
        </div>
    )
}
