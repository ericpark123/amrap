import { createContext } from "react"

interface SelectedGymContextType {
    selectedGym: google.maps.LatLngLiteral,
    setSelectedGym: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
}

export const SelectedGymContext = createContext<SelectedGymContextType | null>(null)
