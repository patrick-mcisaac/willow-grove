import type {
    ArtistLocation,
    LocationContextType,
    Locations
} from "@/types/LocationTypes"
import React, { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

export const LocationsContext = createContext<LocationContextType | undefined>(
    undefined
)

export const LocationsProvider = ({ children }: Props) => {
    const [locations, setLocations] = useState<Locations[] | []>([])
    const [allArtistsLocations, setAllArtistsLocations] = useState<
        ArtistLocation[] | []
    >([])

    const getLocations = () => {
        fetch(`http://localhost:8088/locations`)
            .then(res => res.json())
            .then(setLocations)
    }

    const addArtistLocation = (data: ArtistLocation) => {
        return fetch(`http://localhost:8088/artistLocations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const getAllArtistsLocations = (): void => {
        fetch(`http://localhost:8088/artistLocations`)
            .then(res => res.json())
            .then(setAllArtistsLocations)
    }

    return (
        <LocationsContext.Provider
            value={{
                locations,
                getLocations,
                addArtistLocation,
                allArtistsLocations,
                setAllArtistsLocations,
                getAllArtistsLocations
            }}
        >
            {children}
        </LocationsContext.Provider>
    )
}

/* Custom Hook */
export const useLocations = () => {
    const context = useContext(LocationsContext)
    if (!context) {
        throw new Error("useLocations must be used within LocationsProvider")
    }
    return context
}
