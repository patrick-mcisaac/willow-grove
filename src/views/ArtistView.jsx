import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Home } from "../components/home/Home"
import { Events } from "../components/events/Events"
import { Artists } from "../components/artists/Artists"
import { ArtistDetails } from "../components/artists/ArtistDetails"
import { EditBooking } from "../components/Bookings/EditBooking"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { AddBooking } from "../components/Bookings/AddBooking"

export const ArtistView = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="artists" element={<Outlet />}>
                    <Route index element={<Artists />} />
                    <Route path=":id" element={<Outlet />}>
                        <Route index element={<ArtistDetails />} />
                        {/* <Route path="edit" element={<EditArtist />} /> */}
                        <Route
                            path="booking/:bookingId/edit"
                            element={<EditBooking />}
                        />
                        <Route path="booking/add" element={<AddBooking />} />
                    </Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    )
}
