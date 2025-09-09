import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    test: {
        globals: true, // Enables global test functions (describe, it, expect)
        environment: "jsdom" // Simulates a browser environment
    }
})
