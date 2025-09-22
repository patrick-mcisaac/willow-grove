import React, { useContext, useEffect, useState } from "react"
import { LocationsContext } from "../locations/LocationsContext"

export const FilterBar = ({ artists, filteredArtists, setFilteredArtists }) => {
    const {
        getLocations,
        locations,
        getAllArtistsLocations,
        allArtistsLocations
    } = useContext(LocationsContext)

    const [locationChoice, setLocationChoice] = useState(0)
    const [searchArtist, setSearchArtist] = useState("")

    useEffect(() => {
        getLocations()
        getAllArtistsLocations()
    }, [])

    useEffect(() => {
        if (locationChoice === 0) {
            setFilteredArtists(artists)
        } else {
            const filteredLocation = allArtistsLocations.filter(
                l => l.locationId === locationChoice
            )

            const found = artists.filter(a => {
                debugger
                return filteredLocation.forEach(l => l.userId === a.id)
            })

            setFilteredArtists(found)
        }
    }, [locationChoice, allArtistsLocations, artists])

    const handleLocation = e => {
        setLocationChoice(parseInt(e.target.value))
    }

    const handleSearch = e => {
        setSearchArtist(e.target.value)
    }
    return (
        <div>
            <select value={locationChoice} onChange={handleLocation}>
                <option value="0">Choose Location</option>
                {locations.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.city}
                    </option>
                ))}
            </select>

            <input
                type="text"
                onChange={handleSearch}
                value={searchArtist}
                placeholder="Search"
            />
        </div>
    )
}
