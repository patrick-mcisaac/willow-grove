export interface UserContextType {
    currentUser: number | null
    setCurrentUser: React.Dispatch<React.SetStateAction<number | null>>
}
