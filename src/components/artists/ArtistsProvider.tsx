import type {
    ArtistContextType,
    ArtistLocations,
    Artists
} from "@/types/ArtistTypes"
import React, { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

export const ArtistsContext = createContext<ArtistContextType | undefined>(
    undefined
)

export const ArtistsProvider = ({ children }: Props) => {
    const [artists, setArtists] = useState<Artists[] | undefined>(undefined)

    const [artistLocations, setArtistLocations] = useState<ArtistLocations[]>(
        []
    )

    const getArtists = () => {
        fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(setArtists)
    }

    const getArtistById = (id: string): Promise<any> => {
        return fetch(`http://localhost:8088/users/${id}`).then(res =>
            res.json()
        )
    }

    const addArtist = async (data: Artists) => {
        // adding return
        await fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const updateArtist = (id: string, data: Artists) => {
        fetch(`http://localhost:8088/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const getArtistsLocations = (id: string | undefined) => {
        fetch(
            `http://localhost:8088/artistLocations?userId=${id}&_expand=location`
        )
            .then(res => res.json())
            .then(setArtistLocations)
    }

    const deleteArtist = async (id: string): Promise<void> => {
        await fetch(`http://localhost:8088/users/${id}`, {
            method: "DELETE"
        })
        await fetch(`http://localhost:8088/artistLocations?userId=${id}`, {
            method: "DELETE"
        })
        await fetch(`http://localhost:8088/bookings?userId=${id}`, {
            method: "DELETE"
        })
    }

    return (
        <ArtistsContext.Provider
            value={{
                artists,
                getArtists,
                getArtistById,
                addArtist,
                updateArtist,
                artistLocations,
                getArtistsLocations,
                deleteArtist
            }}
        >
            {children}
        </ArtistsContext.Provider>
    )
}

/* Custom Hook */

export const useArtists = () => {
    const context = useContext(ArtistsContext)

    if (!context) {
        throw new Error(`useArtists must be used within ArtistsProvider`)
    }
    return context
}
