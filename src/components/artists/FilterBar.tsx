import React, { useEffect, useState } from "react"
import { useLocations } from "../locations/LocationsProvider"
import type { ArtistLocation } from "@/types/LocationTypes"

export const FilterBar = ({ setFilteredArtists, artists }) => {
    const {
        locations,
        getLocations,
        getAllArtistsLocations,
        allArtistsLocations
    } = useLocations()

    const [locationChoice, setLocationChoice] = useState<number>(0)
    const [filteredLocation, setFilteredLocation] = useState<
        ArtistLocation[] | []
    >([])

    useEffect(() => {
        getLocations()
        getAllArtistsLocations()
    }, [])

    // update filtered location with artist location that matches locationId
    useEffect(() => {
        if (locationChoice === 0) {
            setFilteredLocation(allArtistsLocations)
        } else {
            const found = allArtistsLocations.filter(
                l => l.locationId === locationChoice
            )
            setFilteredLocation(found)
        }
    }, [locationChoice])
    // update filtered artist based off filtered locations
    useEffect(() => {
        if (locationChoice === 0) {
            setFilteredArtists(artists)
        } else {
            const found = artists.filter(a => {
                return filteredLocation.find(location => {
                    return a.id === location.userId
                })
            })
            setFilteredArtists(found)
        }
    }, [filteredLocation])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setLocationChoice(parseInt(e.target.value))
    }

    return (
        <div>
            <select
                onChange={handleChange}
                value={locationChoice}
                name="filter-location"
                id="filter-location"
            >
                <option value="0">Filter by location</option>
                {locations.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.city}
                    </option>
                ))}
            </select>
        </div>
    )
}
