import { useState } from "react"
import { EventsContext } from "./EventsContext"

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        fetch(`http://localhost:8088/eventTypes`)
            .then(res => res.json())
            .then(setEvents)
    }

    return (
        <EventsContext.Provider value={{ events, getEvents }}>
            {children}
        </EventsContext.Provider>
    )
}
