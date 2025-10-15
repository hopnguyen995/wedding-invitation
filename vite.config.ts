import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === "groom"
      ? "/wedding-invitation/groom/"
      : "/wedding-invitation/bride/",
  };
});
