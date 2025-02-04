// Vite configuration file for setting up plugins and other options
// For more details, visit: https://vite.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
