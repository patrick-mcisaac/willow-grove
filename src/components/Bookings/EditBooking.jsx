import React, { useContext, useEffect } from "react"
import { EventsContext } from "../events/EventsProvider"
import { BookingsContext } from "./BookingsProvider"
import { useParams } from "react-router-dom"
import { ArtistsContext } from "../artists/ArtistsProvider"

export const EditBooking = () => {
    const { getEvents, events } = useContext(EventsContext)
    const { booking, setBooking, getBookingById } = useContext(BookingsContext)
    const { artistLocations, getArtistsLocations } = useContext(ArtistsContext)

    const { id, bookingId } = useParams()

    useEffect(() => {
        getEvents()
        getBookingById(bookingId)
        getArtistsLocations(parseInt(id))
    }, [])

    // handle change to setBooking to new values
    const handleChange = e => {
        const copyBooking = { ...booking }
        copyBooking[e.target.name] = parseInt(e.target.value)
        setBooking(copyBooking)
    }

    const handleDate = e => {
        const copyBooking = { ...booking }
        copyBooking[e.target.name] = e.target.value
        setBooking(copyBooking)
    }

    const handleSave = e => {
        e.preventDefault()
    }
    return (
        <form action="">
            <fieldset>
                <label htmlFor="event">Event Type</label>
                <select
                    onChange={handleChange}
                    value={booking.eventTypeId}
                    name="eventTypeId"
                    id="event"
                >
                    <option value="0">What type of event</option>

                    {events.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="city">City</label>
                <select
                    onChange={handleChange}
                    value={booking.locationId}
                    name="locationId"
                    id="city"
                >
                    <option value="0">What city?</option>
                    {artistLocations.map(l => (
                        <option key={l.locationId} value={l.locationId}>
                            {l.location.city}
                        </option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="date">Date</label>
                <input
                    onChange={handleDate}
                    value={booking.date}
                    type="date"
                    name="date"
                    id="date"
                />
            </fieldset>
            <button onClick={handleSave}>Save</button>
        </form>
    )
}
