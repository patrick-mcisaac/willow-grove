import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe } from "vitest"
import { NavBar } from "../src/components/nav/NavBar.jsx"
import { BrowserRouter } from "react-router-dom"

describe("Nav Bar", () => {
    it("renders a navbar ul", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        )
        expect(screen.getByRole("list")).toBeInTheDocument()
    })

    it("has Events, Artists, and Login in the bar", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        )
        expect(
            screen.getByRole("link", { name: /events/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("link", { name: /artists/i })
        ).toBeInTheDocument()

        expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
    })

    // TODO: when user is logged in

    it.skip("has logout, bookings, and profile when signed in", () => {})
})
