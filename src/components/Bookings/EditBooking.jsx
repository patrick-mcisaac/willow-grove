import React, { useContext, useEffect } from "react"
import { EventsContext } from "../events/EventsProvider"
import { BookingsContext } from "./BookingsProvider"
import { useNavigate, useParams } from "react-router-dom"
import { ArtistsContext } from "../artists/ArtistContext"

export const EditBooking = () => {
    const { getEvents, events } = useContext(EventsContext)
    const { booking, editBooking, setBooking, getBookingById } =
        useContext(BookingsContext)
    const { artistLocations, getArtistsLocations } = useContext(ArtistsContext)

    const { id, bookingId } = useParams()

    const navigate = useNavigate()

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

        if (
            booking.date === "" ||
            booking.eventTypeId === 0 ||
            booking.locationId === 0 ||
            booking.userId === 0
        ) {
            window.alert("fill out the form")
        } else {
            editBooking(bookingId, booking).then(() => {
                navigate(`/artists/${id}`)
            })
        }
    }
    return (
        <form
            name="form"
            className="mx-auto mt-[10rem] flex w-[20rem] flex-col items-center gap-10"
            action=""
        >
            <h1 className="text-[3rem] font-bold tracking-wider">Edit Gig</h1>
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="event">
                    Event Type
                </label>
                <select
                    className="shadow-dark w-full cursor-pointer rounded-2xl p-1 pl-2 shadow-sm"
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
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="city">
                    City
                </label>
                <select
                    className="shadow-dark w-full cursor-pointer rounded-2xl p-1 pl-2 shadow-sm"
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
            <fieldset className="flex w-full flex-col items-start gap-2">
                <label className="self-center pl-1 text-xl" htmlFor="date">
                    Date
                </label>
                <input
                    className="shadow-dark w-full cursor-pointer rounded-2xl p-1 pl-2 shadow-sm"
                    onChange={handleDate}
                    value={booking.date}
                    type="date"
                    name="date"
                    id="date"
                />
            </fieldset>
            <button
                className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[3rem] w-[10rem] cursor-pointer rounded-2xl font-bold tracking-wider shadow-sm transition hover:scale-105"
                onClick={handleSave}
            >
                Save
            </button>
        </form>
    )
}
