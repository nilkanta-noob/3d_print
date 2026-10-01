import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Third-party decoders shipped as minified bundles. Linting them produced 9 of the project's 10
    // errors and 220 of its 240 warnings — none of it code we wrote or can change — which buried the
    // one real error in the noise. Nothing under public/ is authored here.
    "public/**",
  ]),
]);

export default eslintConfig;
