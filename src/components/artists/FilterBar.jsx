import React, { useContext, useEffect, useState } from "react"
import { LocationsContext } from "../locations/LocationsContext"

export const FilterBar = ({ artists, setFilteredArtists }) => {
    const {
        getLocations,
        locations,
        getAllArtistsLocations,
        allArtistsLocations
    } = useContext(LocationsContext)

    const [locationChoice, setLocationChoice] = useState(0)
    const [searchArtist, setSearchArtist] = useState("")
    const [filteredLocation, setFilteredLocation] = useState([])

    useEffect(() => {
        getLocations()
        getAllArtistsLocations()
    }, [])

    useEffect(() => {
        if (locationChoice === 0) {
            setFilteredLocation(allArtistsLocations)
        } else {
            const found = allArtistsLocations.filter(
                l => l.locationId === locationChoice
            )

            setFilteredLocation(found)
        }
    }, [locationChoice, allArtistsLocations])

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
    }, [artists, filteredLocation, locationChoice])

    useEffect(() => {
        if (searchArtist === "") {
            setFilteredArtists(artists)
        } else {
            const found = artists.filter(a =>
                a.name.toLowerCase().includes(searchArtist.toLowerCase())
            )
            setFilteredArtists(found)
        }
    }, [searchArtist, artists])

    const handleLocation = e => {
        setLocationChoice(parseInt(e.target.value))
    }

    const handleSearch = e => {
        setSearchArtist(e.target.value)
    }
    return (
        <div className="flex flex-col items-center justify-center gap-[2rem] p-[0_.5rem] md:mt-[-2rem] md:gap-[3rem] lg:w-full lg:flex-row lg:justify-center lg:gap-[20rem]">
            <select
                className="shadow-dark w-[20rem] cursor-pointer rounded-2xl p-1 pl-2 shadow-sm"
                value={locationChoice}
                onChange={handleLocation}
            >
                <option value="0">Choose Location</option>
                {locations.map(l => (
                    <option key={l.id} value={l.id}>
                        {l.city}
                    </option>
                ))}
            </select>

            <input
                className="shadow-dark w-[20rem] rounded-2xl p-1 pl-3 shadow-sm"
                type="text"
                onChange={handleSearch}
                value={searchArtist}
                placeholder="Search"
            />
        </div>
    )
}
