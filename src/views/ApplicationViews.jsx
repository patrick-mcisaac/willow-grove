import React from "react"
import { UserView } from "./UserView"
import { EventsProvider } from "../components/events/EventsProvider"
import { ArtistsProvider } from "../components/artists/ArtistsProvider"

export const ApplicationViews = () => {
    return (
        <ArtistsProvider>
            <EventsProvider>
                <UserView />
            </EventsProvider>
        </ArtistsProvider>
    )
}
