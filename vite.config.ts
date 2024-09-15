/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      reporter: ["lcov", "text"],
      exclude: [
        "./sonar.js",
        "./plopfile.js",
        "./.eslintrc.cjs",
        "./vite.config.ts",
        "src/**/*.types.ts",
        "src/types/*",
        "src/vite-env.d.ts",
        "src/helpers/api.ts",
      ],
    },
    reporters: [
      "default",
      ["vitest-sonar-reporter", { outputFile: "coverage/sonar-report.xml" }],
    ],
  },
});
