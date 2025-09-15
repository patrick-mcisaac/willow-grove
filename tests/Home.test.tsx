import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe } from "vitest"
import { Home } from "../src/components/home/Home"

describe("Home page", () => {
    it("display Willow Grove", () => {
        render(<Home />)
        expect(screen.getByText(/willow grove/i)).toBeInTheDocument()
    })

    it("has an image", () => {
        render(<Home />)
        expect(screen.getByRole("img")).toBeInTheDocument()
    })
})
