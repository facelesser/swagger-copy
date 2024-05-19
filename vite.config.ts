import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
// import mpa from 'vite-plugin-mpa'
// https://vitejs.dev/config/
console.log(process.env.NODE_ENV) 
export default defineConfig({
  plugins: [
    react(),
     crx({ manifest })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
    global: {},
  },
  build: {
    outDir: process.env.NODE_ENV === 'development' ? 'dist': 'build',
    rollupOptions: {
      input: {
        index: "./index.html",
        sidepanel: "./sidepanel.html",
      },
    },
  },
});
