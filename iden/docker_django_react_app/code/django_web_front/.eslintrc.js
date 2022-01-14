module.exports = {
  extends: ["next", "next/core-web-vitals", "prettier", "next/babel"],
  rules: {
    semi: "error",
    "import/prefer-default-export": "off",
    "newline-before-return": "error",
    "no-console": "warn",
    "no-var": "error",
  },
};
