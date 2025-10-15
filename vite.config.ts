import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isGroom = mode === "groom";

  return {
    plugins: [react()],
    base: isGroom
      ? "/wedding-invitation/groom/"
      : "/wedding-invitation/bride/",
    define: {
      "import.meta.env.VITE_GROOM": JSON.stringify(isGroom),
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
