export interface UserContextType {
    currentUser: number | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<number | undefined>>
}
