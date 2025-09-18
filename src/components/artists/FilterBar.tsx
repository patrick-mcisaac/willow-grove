import React, { useEffect, useState } from "react"
import { useLocations } from "../locations/LocationsProvider"
import type { ArtistLocation } from "@/types/LocationTypes"
import type { Artist } from "@/types/ArtistTypes"

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
    const [searchArtist, setSearchArtist] = useState<string>("")

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
            const found = artists.filter((a: Artist) => {
                return filteredLocation.find(location => {
                    return a.id === location.userId
                })
            })
            setFilteredArtists(found)
        }
    }, [filteredLocation])

    useEffect(() => {
        if (searchArtist === "") {
            setFilteredArtists(artists)
        } else {
            const found = artists.filter((a: Artist) =>
                a.name.toLowerCase().includes(searchArtist)
            )
            setFilteredArtists(found)
        }
    }, [searchArtist])

    const handleLocationChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        setLocationChoice(parseInt(e.target.value))
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchArtist(e.target.value)
    }

    return (
        <div className="mt-[-2rem] flex w-full items-center justify-evenly gap-[5rem]">
            <select
                className="shadow-dark w-[20rem] cursor-pointer rounded-2xl p-1 pl-2 shadow-sm"
                onChange={handleLocationChange}
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

            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search Artist"
                className="shadow-dark w-[20rem] rounded-2xl p-1 pl-3 shadow-sm"
                value={searchArtist}
            />
        </div>
    )
}
