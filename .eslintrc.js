module.exports = {
  extends: "eslint:recommended",
  root: true,
  globals: {
    window: true,
    document: true,
  },
  parserOptions: {
  },
  rules : {
  },
  env: {
    browser: true,
    es6: true
  },
  parser: "babel-eslint"
};