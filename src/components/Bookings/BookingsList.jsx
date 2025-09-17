import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BookingsContext } from "./BookingsContext"
import { UserContext } from "../../views/UserContext"

export const BookingsList = ({ booking, setBookings, getBookings }) => {
    const navigate = useNavigate()
    const { removeBooking } = useContext(BookingsContext)
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)

    const handleDelete = async () => {
        await removeBooking(booking.id)
        await getBookings(parseInt(id)).then(setBookings)
    }
    return (
        <div className="relative flex flex-col items-center">
            <div className="shadow-blue border-light-blue flex w-[30rem] flex-col justify-start gap-[2rem] rounded-2xl border-[.1rem] p-[1rem] shadow-md">
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
                {currentUser === parseInt(id) && (
                    <div className="flex w-full items-center justify-evenly">
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
                            onClick={handleDelete}
                            className="fa-regular fa-trash-can cursor-pointer text-[2.5rem] transition hover:scale-105 hover:text-red-500"
                        ></i>
                    </div>
                )}
            </div>
        </div>
    )
}
