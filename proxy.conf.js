import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://8226-103-129-95-34.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
