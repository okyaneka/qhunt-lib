import { defineConfig } from "tsup";
import { glob } from "glob";

const srcFiles = glob.sync("_src/**/*.{ts,tsx}", {
  ignore: ["_src/**/*.test.ts", "tsup.config.ts", "_src/types/*"],
});

export default defineConfig({
  entry: srcFiles,
  format: ["esm", "cjs"],
  outDir: ".",
  splitting: false,
  target: "esnext",
  external: ["_src/_tests/**/*"],
  treeshake: true,
});
