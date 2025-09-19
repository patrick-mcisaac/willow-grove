import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useBookings } from "./BookingsProvider.js"
import { BookingsList } from "./BookingsList.js"
import { useUser } from "../../views/UserProvider.js"
import type { BookingsExpanded } from "@/types/BookingsTypes.js"

export const Bookings = () => {
    const [bookings, setBookings] = useState<BookingsExpanded[] | undefined>(
        undefined
    )
    const { getBookings } = useBookings()
    const { currentUser } = useUser()
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getBookings(id).then(setBookings)
        }
    }, [])
    return (
        <section className="mt-[3rem] flex flex-col items-center gap-[4rem]">
            <h2 className="text-[2rem] font-bold tracking-wider">
                Upcoming Gigs
            </h2>

            {id && currentUser === parseInt(id) && (
                <button
                    onClick={() =>
                        navigate(`/artists/${currentUser}/booking/add`)
                    }
                    className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[2rem] w-[9rem] cursor-pointer rounded-2xl font-semibold tracking-wider shadow-sm transition hover:scale-105 md:h-[3rem] md:w-[10rem] md:font-bold"
                >
                    Add Gig
                </button>
            )}

            <section className="flex flex-col items-center gap-[5rem]">
                {bookings?.map(b => {
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
