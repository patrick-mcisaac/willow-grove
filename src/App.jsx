import { ApplicationViews } from "./views/ApplicationViews"
import { UserProvider } from "./views/UserProvider"

function App() {
    return (
        <UserProvider>
            <ApplicationViews />
        </UserProvider>
    )
}

export default App
