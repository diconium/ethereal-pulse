/// <reference types="vitest" />

import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // For production builds remove in-source test suites
  define: { 
    'import.meta.vitest': 'undefined', 
  },
  test: {
    includeSource: ['app/**/*.{js,ts}'],
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
