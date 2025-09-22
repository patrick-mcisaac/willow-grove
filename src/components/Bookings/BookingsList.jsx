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
            <div className="shadow-blue border-light-blue flex w-[15rem] flex-col justify-start gap-[2rem] rounded-2xl border-[.1rem] p-[1rem] shadow-md md:w-[30rem]">
                <div className="flex justify-around">
                    <p className="text-[1rem] font-semibold md:text-[1.5rem]">
                        {booking.date}
                    </p>
                    <p className="text-[1rem] font-semibold md:text-[1.5rem]">
                        {booking.location.city}
                    </p>
                </div>
                <p className="text-[1rem] font-semibold md:text-[1.5rem]">
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
                            className="shadow-dark bg-blue-grey hover:bg-light-blue text-dark hover:text-light w-[5rem] cursor-pointer rounded-2xl text-[1rem] font-semibold tracking-wider shadow-sm transition hover:scale-105 md:h-[3rem] md:w-[10rem] md:font-bold"
                        >
                            Edit
                        </button>
                        <i
                            onClick={handleDelete}
                            className="fa-regular fa-trash-can mt-1 cursor-pointer text-[1.3rem] transition hover:scale-105 hover:text-red-500 md:text-[2.5rem]"
                        ></i>
                    </div>
                )}
            </div>
        </div>
    )
}
