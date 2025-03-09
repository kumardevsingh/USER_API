import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pretteir from "prettier";
import pretteirConfig from "eslint-config-prettier";
import pretteirPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["node_modules/", "dist/", "build/", "public/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pretteir,
  pretteirConfig,
  {
    plugins: { pretteir: pretteirPlugin },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
