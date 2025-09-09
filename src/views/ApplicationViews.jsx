import React from "react"
import { UserView } from "./UserView"
import { EventsProvider } from "../components/events/EventsProvider"

export const ApplicationViews = () => {
    return (
        <EventsProvider>
            <UserView />
        </EventsProvider>
    )
}
