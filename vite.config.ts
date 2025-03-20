import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";
import externalGlobals from "rollup-plugin-external-globals";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path from "path";
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
    {
      name: "app.json",
      writeBundle() {
        const destPath = path.resolve(__dirname, dist, "app.json");
        fs.writeFileSync(
          destPath,
          JSON.stringify({
            title: pkg.title || pkg.name,
            flag: pkg.flag,
            desc: pkg.description,
          })
        );
      },
    },
  ],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        externalGlobals({
          react: 'React',
          'react-dom': 'ReactDOM',
        }),
      ],
    },
    outDir: dist,
  },
  server: {
    proxy: {
      "/userinfo": {
        target: "https://it.bright-ai.com",
        secure: false,
      },
      "/logout": {
        target: "https://it.bright-ai.com",
        secure: false,
      },
      "/login": {
        target: "https://it.bright-ai.com",
        secure: false,
      },
    },
  },
});
