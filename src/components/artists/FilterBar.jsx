import React, { useContext, useEffect } from "react"
import { LocationsContext } from "../locations/LocationsContext"

export const FilterBar = ({ filteredArtists, setFilteredArtists }) => {
    const { getLocations, locations } = useContext(LocationsContext)

    useEffect(() => {
        getLocations()
    }, [])
    return (
        <div>
            <select>
                <option value="0">Choose Location</option>
                {locations.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.city}
                    </option>
                ))}
            </select>

            <input type="text" value={""} placeholder="Search" />
        </div>
    )
}
