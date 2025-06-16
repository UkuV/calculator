import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Vite default port
    setupNodeEvents(on, config) {},
  },
});
