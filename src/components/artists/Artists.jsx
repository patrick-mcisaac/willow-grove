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
        <div className="flex flex-col items-center gap-[2.5rem] p-[3rem] md:gap-[4rem] lg:gap-[5rem] lg:p-[5rem]">
            <h1 className="text-center text-[2.3rem] font-bold tracking-wider md:text-[4rem] lg:text-[5rem]">
                Our Artists
            </h1>
            <FilterBar
                setFilteredArtists={setFilteredArtists}
                artists={artists}
            />
            <div className="flex w-full flex-wrap items-center justify-around gap-[5rem_4rem]">
                {filteredArtists.map(a => (
                    <ArtistsList key={a.id} artist={a} />
                ))}
            </div>
        </div>
    )
}
