import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Home } from "../components/home/Home"
import { Events } from "../components/events/Events"

export const UserView = () => {
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
                <Route path="artists" element={<div>Artists</div>} />
                <Route path="login" element={<div>Login</div>} />
            </Route>
        </Routes>
    )
}
