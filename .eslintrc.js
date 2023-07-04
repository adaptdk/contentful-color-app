module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [`plugin:react/recommended`, `eslint-config-prettier`],
  parserOptions: {
    ecmaVersion: `latest`,
    sourceType: `module`,
  },
  plugins: [`react`, `simple-import-sort`, `eslint-plugin-prettier`],
  rules: {
    "arrow-body-style": [`error`, `as-needed`],
    "eol-last": [`error`, `always`],
    "linebreak-style": [`error`, `unix`],
    "no-alert": `error`,
    "no-multiple-empty-lines": [`error`, { max: 1, maxEOF: 2 }],
    quotes: [`error`, `backtick`],
    indent: [`error`, 2],
    "simple-import-sort/imports": `error`,
    "simple-import-sort/exports": `error`,
    "max-len": [`error`, { code: 80, ignoreUrls: true }],
    "prettier/prettier": `error`,
  },
};
