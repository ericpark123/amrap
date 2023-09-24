import { GoogleMapsView } from "@/app/(components)/ui/custom/map/google-map-view"

async function getGyms() {
    const response = await import("@/app/api/google-places/route")
    return await ((await response.GET()).json())
  }

export default async function Locator() {
    const gyms = await getGyms()
    
    return (
        <div className="container relative">
            <GoogleMapsView></GoogleMapsView>
        </div>
    )
}
