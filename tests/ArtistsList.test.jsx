import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe } from "vitest"
import { ArtistsList } from "../src/components/artists/ArtistsList"
import { BrowserRouter } from "react-router-dom"

describe("displays the artists info", () => {
    const mockProp = {
        id: 1,
        name: "test name",
        email: "test email",
        imageUrl: "test url"
    }

    it("renders artists info", () => {
        render(
            <BrowserRouter>
                <ArtistsList artist={mockProp} />
            </BrowserRouter>
        )
        expect(screen.getByText(/test name/i)).toBeInTheDocument()
        expect(screen.getByRole("img")).toBeInTheDocument()
    })
})
