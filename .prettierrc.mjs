/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */
const config = {
  importOrder: [
    "<TYPES>",
    "<TYPES>^[.]",
    "",
    "^(next/(.*)$)|^(next$)",
    "(.*)?next.*",
    "^(react/(.*)$)|^(react$)",
    "^(react-router-dom$)",
    "(.*)?react.*",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/auth",
    "^@/auth.config",
    "^@/components/(.*)",
    "^@/(.*)",
    "",
    "^[.]",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
