import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "dom",
          environment: "jsdom",
          include: ["test/gtm/**/*.test.{ts,tsx}", "src/components/datalayer-documenter/**/*.test.{ts,tsx}"],
          setupFiles: ["test/gtm/setup.ts"],
        },
      },
      {
        test: {
          name: "node",
          environment: "node",
          include: ["test/*.test.{js,mjs,ts}"],
        },
      },
    ],
  },
});
