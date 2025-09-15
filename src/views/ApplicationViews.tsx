import React, { useContext, useEffect } from "react"

import { ArtistView } from "./ArtistView.js"
import { EventsProvider } from "../components/events/EventsProvider.js"
import { ArtistsProvider } from "../components/artists/ArtistsProvider.js"
import { UserContext } from "./UserProvider.js"
import { BookingsProvider } from "../components/Bookings/BookingsProvider.js"
import { LocationsProvider } from "../components/locatioins/LocationsProvider.js"

export const ApplicationViews = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

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
