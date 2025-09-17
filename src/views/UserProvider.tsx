import type { UserContextType } from "@/types/UserTypes"
import React, { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<number | undefined>(
        undefined
    )

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}

/* Custom Hook */

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within UserProvider")
    }
    return context
}
