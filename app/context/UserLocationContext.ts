import { createContext } from "react"

interface UserLocationContextType {
    userLocation: google.maps.LatLngLiteral,
    setUserLocation: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
}

export const UserLocationContext = createContext<UserLocationContextType | null>(null)
