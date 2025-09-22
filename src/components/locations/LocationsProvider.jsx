import { useState } from "react"
import { LocationsContext } from "./LocationsContext"

export const LocationsProvider = ({ children }) => {
    const [locations, setLocations] = useState([])
    const [allArtistsLocations, setAllArtistsLocations] = useState([])

    const getLocations = () => {
        fetch(`http://localhost:8088/locations`)
            .then(res => res.json())
            .then(setLocations)
    }

    const addArtistLocation = data => {
        return fetch(`http://localhost:8088/artistLocations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const getAllArtistsLocations = () => {
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
                getAllArtistsLocations,
                allArtistsLocations
            }}
        >
            {children}
        </LocationsContext.Provider>
    )
}
