import { createContext } from "react"

interface SelectedGymContextType {
    selectedGym: {},
    setSelectedGym: React.Dispatch<React.SetStateAction<{}>>
}

export const SelectedGymContext = createContext<SelectedGymContextType | null>(null)
