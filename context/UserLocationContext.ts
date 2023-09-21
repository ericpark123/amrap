import { createContext } from "react"

type UserContextType = {
    context: google.maps.LatLngLiteral | null,
    setContext: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>
}

const iUserContextState = {
    context: null,
    setContext: () => {}
}

const UserLocationContext= createContext<UserContextType>(iUserContextState)

export default UserLocationContext