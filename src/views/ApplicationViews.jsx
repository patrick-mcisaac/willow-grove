import React, { useContext, useEffect } from "react"
import { UserView } from "./UserView"
import { ArtistView } from "./ArtistView"
import { EventsProvider } from "../components/events/EventsProvider"
import { ArtistsProvider } from "../components/artists/ArtistsProvider"
import { UserContext } from "./UserProvider"
import { BookingsProvider } from "../components/Bookings/BookingsProvider"

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
                    <ArtistView />
                </BookingsProvider>
            </EventsProvider>
        </ArtistsProvider>
    )
}
