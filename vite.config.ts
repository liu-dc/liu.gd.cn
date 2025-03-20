import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";
import { createHtmlPlugin } from "vite-plugin-html";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("./package.json");
// const dist = `dist/${pkg.name}`;
const dist = "docs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: pkg.title || pkg.name,
          isProd: process.env.NODE_ENV === "production",
        },
      },
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: dist,
  },
  server: {
    proxy: {
      "/test": {
        target: "https://test.bright-ai.com",
        secure: false,
      }
    },
  },
});
