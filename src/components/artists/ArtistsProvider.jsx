import { useState } from "react"
import { ArtistsContext } from "./ArtistContext"

export const ArtistsProvider = ({ children }) => {
    const [artists, setArtists] = useState([])
    const [artistBookings, setArtistBookings] = useState({})
    const [artistLocations, setArtistLocations] = useState([])

    const getArtists = () => {
        fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(setArtists)
    }

    const getArtistById = id => {
        return fetch(`http://localhost:8088/users/${id}`).then(res =>
            res.json()
        )
    }

    const getArtistBookings = id => {
        fetch(`http://localhost:8088/users/${id}?_embed=bookings`)
            .then(res => res.json())
            .then(setArtistBookings)
    }

    const addArtist = data => {
        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const updateArtist = (id, data) => {
        fetch(`http://localhost:8088/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const getArtistsLocations = id => {
        fetch(
            `http://localhost:8088/artistLocations?userId=${id}&_expand=location`
        )
            .then(res => res.json())
            .then(setArtistLocations)
    }

    const deleteArtist = async id => {
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
                artistBookings,
                getArtistBookings,
                artistLocations,
                getArtistsLocations,
                deleteArtist
            }}
        >
            {children}
        </ArtistsContext.Provider>
    )
}
