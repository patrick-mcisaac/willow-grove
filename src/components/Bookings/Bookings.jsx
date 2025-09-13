import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookingsContext } from "./BookingsProvider"
import { BookingsList } from "./BookingsList"

export const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const { getBookings } = useContext(BookingsContext)

    const { id } = useParams()

    useEffect(() => {
        getBookings(parseInt(id)).then(setBookings)
    }, [bookings])
    return (
        <section className="mt-[2rem] flex flex-col items-center gap-[5rem]">
            <h2 className="text-[2rem] font-bold tracking-wider">
                Upcoming Gigs
            </h2>

            <section className="flex flex-col items-center gap-[5rem]">
                {bookings.map(b => {
                    return (
                        <BookingsList
                            key={b.id}
                            setBookings={setBookings}
                            getBookings={getBookings}
                            booking={b}
                        />
                    )
                })}
            </section>
        </section>
    )
}
