import React, { useContext, useEffect } from "react"
import { EventsContext } from "./EventsProvider"
import { EventsList } from "./EventsList"

export const Events = () => {
    const { events, getEvents } = useContext(EventsContext)

    useEffect(() => {
        getEvents()
    }, [])
    return (
        <div>
            <h1>Our Events</h1>
            {events.map(e => (
                <EventsList key={e.id} event={e} />
            ))}
        </div>
    )
}
