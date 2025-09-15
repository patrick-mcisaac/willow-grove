import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom/vitest"
import { it, expect, describe, vi, afterEach } from "vitest"
import { NavBar } from "../src/components/nav/NavBar.js"
import { BrowserRouter } from "react-router-dom"
import { UserContext } from "../src/views/UserProvider.js"

const mockSetUser = vi.fn()

const createWrapper = (contextValues = {}) => {
    const {
        UserValues = {
            setCurrentUser: mockSetUser,
            currentUser: null
        }
    } = contextValues

    return ({ children }) => (
        <UserContext.Provider value={UserValues}>
            {children}
        </UserContext.Provider>
    )
}

afterEach(() => {
    vi.clearAllMocks()
})

describe("Nav Bar", () => {
    it("renders a navbar ul", () => {
        const TestWrapper = createWrapper()
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>,
            { wrapper: TestWrapper }
        )
        expect(screen.getByRole("list")).toBeInTheDocument()
    })

    it("has Artists, and Login in the bar", () => {
        const TestWrapper = createWrapper()

        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>,
            { wrapper: TestWrapper }
        )

        expect(
            screen.getByRole("link", { name: /artists/i })
        ).toBeInTheDocument()

        expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
    })

    it("should have logout", () => {
        const TestWrapper = createWrapper({
            UserValues: {
                currentUser: 1,
                setCurrentUser: mockSetUser
            }
        })

        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>,
            { wrapper: TestWrapper }
        )

        expect(
            screen.getByRole("link", { name: /logout/i })
        ).toBeInTheDocument()
    })
})
