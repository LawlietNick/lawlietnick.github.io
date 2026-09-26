import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["test/gtm/**/*.test.{ts,tsx}", "src/components/datalayer-documenter/**/*.test.{ts,tsx}"],
    setupFiles: ["test/gtm/setup.ts"],
  },
});
