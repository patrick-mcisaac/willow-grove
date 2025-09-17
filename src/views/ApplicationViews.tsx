import React, { useContext, useEffect } from "react"

import { ArtistView } from "./ArtistView"
import { EventsProvider } from "../components/events/EventsProvider"
import { ArtistsProvider } from "../components/artists/ArtistsProvider"
import { useUser } from "./UserProvider"
import { BookingsProvider } from "../components/Bookings/BookingsProvider"
import { LocationsProvider } from "../components/locations/LocationsProvider"

export const ApplicationViews = () => {
    const { currentUser, setCurrentUser } = useUser()

    useEffect(() => {
        const localUser = localStorage.getItem("currentUserId")
        if (localUser) {
            const localUserObj = JSON.parse(localUser)
            setCurrentUser(localUserObj)
        }
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
