import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.js"
import { Home } from "../components/home/Home.js"

import { Artists } from "../components/artists/Artists.js"
import { ArtistDetails } from "../components/artists/ArtistDetails.js"
import { EditBooking } from "../components/Bookings/EditBooking.js"
import { Login } from "../components/auth/Login.js"
import { Register } from "../components/auth/Register.js"
import { AddBooking } from "../components/Bookings/AddBooking.js"

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
                <Route path="artists" element={<Outlet />}>
                    <Route index element={<Artists />} />
                    <Route path=":id" element={<Outlet />}>
                        <Route index element={<ArtistDetails />} />
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
