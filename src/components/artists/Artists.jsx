import React, { useContext, useEffect, useState } from "react"

import { ArtistsList } from "./ArtistsList"
import { ArtistsContext } from "./ArtistContext"
import { FilterBar } from "./FilterBar"

export const Artists = () => {
    const { artists, getArtists } = useContext(ArtistsContext)
    const [filteredArtists, setFilteredArtists] = useState([])

    useEffect(() => {
        getArtists()
    }, [])
    useEffect(() => {
        setFilteredArtists(artists)
    }, [artists])
    return (
        <div className="flex flex-col items-center gap-[5rem] p-[5rem]">
            <h1 className="text-[5rem] font-bold tracking-wider">
                Our Artists
            </h1>
            <FilterBar
                filteredArtists={filteredArtists}
                setFilteredArtists={setFilteredArtists}
                artists={artists}
            />
            <div className="flex flex-wrap items-center justify-around gap-[5rem_4rem]">
                {filteredArtists.map(a => (
                    <ArtistsList key={a.id} artist={a} />
                ))}
            </div>
        </div>
    )
}
