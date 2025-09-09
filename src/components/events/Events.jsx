import React, { useContext, useEffect } from "react"
import { EventsContext } from "./EventsProvider"
import { EventsList } from "./EventsList"

export const Events = () => {
    const { events, getEvents } = useContext(EventsContext)

    useEffect(() => {
        getEvents()
    }, [])
    return (
        <div className="flex flex-col items-center gap-[3rem] p-10">
            <h1 className="text-center text-[5rem] font-bold tracking-wider">
                Our Events
            </h1>
            {events.map(e => (
                <EventsList key={e.id} event={e} />
            ))}
        </div>
    )
}
