import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/get": {
        target: "https://8226-103-129-95-34.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
      "/api/eeprom": {
        target: "https://6fe4-103-129-95-34.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
