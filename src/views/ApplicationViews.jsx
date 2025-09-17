import React, { useContext, useEffect } from "react"

import { ArtistView } from "./ArtistView"
import { EventsProvider } from "../components/events/EventsProvider"
import { ArtistsProvider } from "../components/artists/ArtistsProvider"
import { BookingsProvider } from "../components/Bookings/BookingsProvider"
import { LocationsProvider } from "../components/locations/LocationsProvider"
import { UserContext } from "./UserContext"

export const ApplicationViews = () => {
    const { setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        const localUser = localStorage.getItem("currentUserId")
        const localUserObj = JSON.parse(localUser)
        setCurrentUser(localUserObj)
    }, [])
    return (
        <ArtistsProvider>
            <EventsProvider>
                <BookingsProvider>
                    <LocationsProvider>
                        <ArtistView />
                    </LocationsProvider>
                </BookingsProvider>
            </EventsProvider>
        </ArtistsProvider>
    )
}
