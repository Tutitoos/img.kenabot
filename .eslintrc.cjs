module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-unused-vars": ["error"],
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-implicit-coercion": "off",
      },
    },
    {
      files: ["./src/**/routers/**/*.ts"],
      rules: {
        "new-cap": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
