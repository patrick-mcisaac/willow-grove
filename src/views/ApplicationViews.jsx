import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { NavBar } from "../components/nav/NavBar"

export const ApplicationViews = () => {
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
            </Route>
        </Routes>
    )
}
