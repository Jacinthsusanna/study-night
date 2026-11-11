import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/", ".parcel-cache/", "node_modules/", "cypress/"] },
  js.configs.recommended,
  {
    files: ["src/**/*.js", "data/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": "error",
      semi: ["error", "always"],
      eqeqeq: "error",
      "no-console": "warn",
    },
  },
  {
    files: ["test/**/*.js", "gulpfile.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.mocha },
    },
  },
  // Disable stylistic rules that conflict with Prettier (kept last, but
  // re-assert the required semicolon rule for source files)
  prettier,
  {
    files: ["src/**/*.js", "data/**/*.js"],
    rules: { semi: ["error", "always"] },
  },
];
