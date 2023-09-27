"use client"

import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'
import GymItem from './gym-item'
import { SelectedGymContext } from '@/app/context/SelectedGymContext'

function GymMarkers({gym}: any) {
    const selectedGym = useContext(SelectedGymContext)
  return (
    <div>
        <MarkerF
                position={gym.geometry.location}
                onClick={()=>selectedGym?.setSelectedGym(gym)}
                icon={{
                  url:'/bluecircle.png',
                  scaledSize: new google.maps.Size(30, 30)
                }}
                
        >
         
            {selectedGym?.selectedGym == gym?  
            <OverlayView
            position={gym.geometry.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className='ml-[-90px] mt-[-230px]'>
                    <GymItem gym={gym} showDir={true} />
                </div>
            </OverlayView>:null}
        </MarkerF>
    </div>
  )
}

export default GymMarkers