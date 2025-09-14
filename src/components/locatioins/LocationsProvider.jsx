import { createContext, useState } from "react"

export const LocationsContext = createContext()

export const LocationsProvider = ({ children }) => {
    const [locations, setLocations] = useState([])

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

    return (
        <LocationsContext.Provider
            value={{ locations, getLocations, addArtistLocation }}
        >
            {children}
        </LocationsContext.Provider>
    )
}
