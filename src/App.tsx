import { ApplicationViews } from "./views/ApplicationViews.js"
import { UserProvider } from "./views/UserProvider.js"

function App() {
    return (
        <UserProvider>
            <ApplicationViews />
        </UserProvider>
    )
}

export default App
