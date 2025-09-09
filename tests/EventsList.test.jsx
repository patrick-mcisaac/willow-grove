import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe } from "vitest"
import { EventsList } from "../src/components/events/EventsList"

const mockProp = {
    id: 1,
    name: "test name",
    description: "test description"
}

describe("EventList", () => {
    it("renders event name", () => {
        render(<EventsList event={mockProp} />)
        expect(screen.getByText(/test name/i)).toBeInTheDocument()
    })

    it("renders description", () => {
        render(<EventsList event={mockProp} />)
        expect(screen.getByText(/test description/i)).toBeInTheDocument()
    })
})
