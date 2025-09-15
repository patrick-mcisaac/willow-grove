import React, { useContext } from "react"
import { BookingsContext } from "./BookingsProvider.js"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../views/UserProvider.js"

export const BookingsList = ({ booking, setBookings, getBookings }) => {
    const navigate = useNavigate()
    const { removeBooking } = useContext(BookingsContext)
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    return (
        <div className="relative flex flex-col items-center">
            <div className="shadow-blue border-light-blue flex h-[8rem] w-[30rem] flex-col justify-evenly rounded-2xl border-[.1rem] shadow-md">
                <div className="flex justify-around">
                    <p className="text-[1.5rem] font-semibold">
                        {booking.date}
                    </p>
                    <p className="text-[1.5rem] font-semibold">
                        {booking.location.city}
                    </p>
                </div>
                <p className="text-center text-[1.3rem] font-semibold">
                    {booking.eventType.name}
                </p>
            </div>
            {currentUser === parseInt(id) && (
                <div className="mt-[2rem] flex w-full items-center justify-evenly">
                    <button
                        onClick={() =>
                            navigate(
                                `/artists/${id}/booking/${booking.id}/edit`
                            )
                        }
                        className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light h-[3rem] w-[10rem] cursor-pointer rounded-2xl font-bold tracking-wider shadow-sm transition hover:scale-105"
                    >
                        Edit
                    </button>
                    <i
                        onClick={() => {
                            return (
                                removeBooking(booking.id),
                                getBookings(parseInt(id)).then(setBookings)
                            )
                        }}
                        className="fa-regular fa-trash-can cursor-pointer text-[2.5rem] transition hover:scale-105 hover:text-red-500"
                    ></i>
                </div>
            )}
        </div>
    )
}
